import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle } from '@mui/material';

import RatingQuestion from 'components/RatingQuestion';
import { useAppDispatch, useAppSelector } from 'settings/hook';
import {
  getUserAssess,
  updateQuestionError,
  updateQuestions, updateUserAssess
} from 'slices/assessment-questions.slice';
import { getQuestions } from 'slices/assessment-questions.slice';
import Information from '../components/Information';
import { LifeTitleNote, LifeType } from '../constant';
import ErrorIcon from '@mui/icons-material/Error';

const AssessmentPage: React.FC = () => {
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ showErrorDialog, setShowErrorDialog] = useState(false);

  const questions = useAppSelector(getQuestions);
  const userAssess = useAppSelector(getUserAssess);

  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [ currentPage ]);

  useEffect(() => {
    const defaultQuestions = JSON.parse(localStorage.getItem('assessment-questions') || 'null');
    const name = localStorage.getItem('assessment-name') || '';

    if (defaultQuestions && typeof defaultQuestions[1]?.type === 'number') {
      dispatch(updateQuestions(defaultQuestions));
    }

    if (name) {
      dispatch(updateUserAssess({ name }));
    }
  }, []);

  const onClickPrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const onClickNext = () => {
    if (!currentPage) {
      if (!userAssess.name) {
        dispatch(updateUserAssess({ ...userAssess, hasError: true }));
        setShowErrorDialog(true);
      } else {
        setCurrentPage(currentPage + 1);
      }

      return;
    }

    let hasError = false;
    let result: any = {};
    Object.values(questions)
      .slice((currentPage - 1) * 7, currentPage * 7)
      .forEach((question: any) => {
        if (!question.value) {
          hasError = true;
          dispatch(updateQuestionError({ id: question.id, hasError: true }));
          result[question.id] = { type: question.type, mark: 0 };
        } else {
          result[question.id] = { type: question.type, mark: question.value };
        }
      });

    if (!hasError) {
      setCurrentPage(currentPage + 1);
    } else {
      setShowErrorDialog(true);
    }
  };

  const onClickSubmit = () => {
    let hasError = false;
    let result: any = {};
    Object.values(questions).forEach((question: any) => {
      if (!question.value) {
        hasError = true;
        dispatch(updateQuestionError({ id: question.id, hasError: true }));
        result[question.id] = { type: question.type, mark: 0 };
      } else {
        result[question.id] = { type: question.type, mark: question.value };
      }
    });

    if (!hasError && userAssess.name) {
      localStorage.setItem('assessment-questions', JSON.stringify(questions));
      localStorage.setItem('assessment-result', JSON.stringify(result));
      localStorage.setItem('assessment-name', userAssess.name);
      localStorage.setItem('assessment-dateSubmitted', new Date().toLocaleString('vi-VN'));

      window.open('/', '_self');
    } else {
      setShowErrorDialog(true);
    }
  };

  return (
    <div className="p-2 sm:p-3 md:p-4 lg:p-5 flex flex-col justify-center items-center">
      <div className="w-full md:w-3/4 lg:w-2/3">
        {
          !currentPage && (
            <div>
              <Information userAssess={userAssess}/>
            </div>
          )
        }

        {
          !!currentPage && (
            <>
              <div className="w-full bg-white mb-2 border-gray-400 rounded-lg">
                <div className="text-2xl md:text-3xl text-center text-white rounded-t-lg border-green-100 py-3"
                     style={{ backgroundColor: '#3D8F2E' }}>
                  Khảo sát sức khoẻ thuộc linh
                </div>
                <div className="p-2 md:p-3 lg:p-4 text-sm">
                  {LifeTitleNote[currentPage - 1 as LifeType]}
                </div>
              </div>

              {Object.values(questions)
                .slice((currentPage - 1) * 7, currentPage * 7)
                .map((question: any, index: number) => {
                  return (
                    <RatingQuestion
                      index={index + 1}
                      id={question.id}
                      title={question.title}
                      isRequired={question.isRequired}
                      hasError={question.hasError}
                      value={question.value}
                      key={question.id}
                    />
                  );
                })}
            </>
          )
        }
      </div>

      <div className="w-full md:w-3/4 lg:w-2/3">
        {
          !currentPage && (
            <Button variant="contained" onClick={onClickNext}>Next</Button>
          )
        }

        {
          currentPage > 0 && currentPage < 5 && (
            <>
              <Button variant="contained" onClick={onClickPrev}>Prev</Button>
              <Button variant="contained" onClick={onClickNext} style={{ marginLeft: 10 }}>Next</Button>
            </>
          )
        }

        {
          currentPage == 5 && (
            <>
              <Button variant="contained" onClick={onClickPrev}>Prev</Button>
              <Button variant="contained" onClick={onClickSubmit} style={{ marginLeft: 10 }}>Submit</Button>
            </>
          )
        }
      </div>

      <Dialog onClose={() => setShowErrorDialog(false)} open={showErrorDialog} sx={{ top: -400 }}>
        <DialogTitle className="text-md text-red-600"><ErrorIcon className="mr-2"/><span>Hãy trả lời tất cả câu hỏi nào!</span></DialogTitle>
      </Dialog>
    </div>
  );
};

export default AssessmentPage;
