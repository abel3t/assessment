import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';

import RatingQuestion from 'components/RatingQuestion';
import { useAppDispatch, useAppSelector } from 'settings/hook';
import { updateQuestionError, updateQuestions } from 'slices/assessment-questions.slice';
import { getQuestions } from 'slices/assessment-questions.slice';
import Information from '../components/Information';

const AssessmentPage: React.FC = () => {
  const [ currentPage, setCurrentPage ] = useState(0);
  const questions = useAppSelector(getQuestions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage])

  useEffect(() => {
    const defaultQuestions = JSON.parse(localStorage.getItem('assessment-questions') || 'null');
    if (defaultQuestions) {
      dispatch(updateQuestions(defaultQuestions));
    }
  }, []);

  const onClickPrev = () => {
    setCurrentPage(currentPage - 1);
  }

  const onClickNext = () => {
    setCurrentPage(currentPage + 1);
  }

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

    if (!hasError) {
      localStorage.setItem('assessment-questions', JSON.stringify(questions));
      localStorage.setItem('assessment-result', JSON.stringify(result));

      window.open('/', '_self');
    }
  };

  console.log(currentPage);
  return (
    <div className="p-2 sm:p-3 md:p-4 lg:p-5 flex flex-col justify-center items-center">
      <div className="w-full md:w-3/4 lg:w-2/3">
        {
          !currentPage && (
            <div>
              <Information />
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
                  Đời sống môn đồ hóa hiểu đơn giản nhất là hành trình bạn tin Chúa và trở nên giống Chúa Jêsus càng hơn mỗi
                  ngày
                </div>
              </div>

              {Object.values(questions).slice((currentPage - 1) * 7, currentPage * 7).map((question: any) => {
                return (
                  <RatingQuestion
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
              <Button variant="contained" onClick={onClickNext} style={{marginLeft: 10}}>Next</Button>
            </>
          )
        }

        {
          currentPage == 5 && (
            <>
              <Button variant="contained" onClick={onClickPrev}>Prev</Button>
              <Button variant="contained" onClick={onClickSubmit} style={{marginLeft: 10}}>Submit</Button>
            </>
          )
        }
      </div>
    </div>
  );
};

export default AssessmentPage;
