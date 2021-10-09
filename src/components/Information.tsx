import React from 'react';
import { FormControlLabel, Input, Radio, RadioGroup } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { useDispatch } from 'react-redux';
import Image from 'next/image';

import { updateUserAssess, updateUserWasAssessed } from 'slices/assessment-questions.slice';
import HangoutImage from '../../public/hangout.png';
import { UserWasAssessedTitle, UserWasAssessedType } from '../constant';

interface InformationProps {
  userAssess?: any;
  userWasAssessed?: any;
}

const Information: React.FC<InformationProps> = ({ userAssess, userWasAssessed }) => {
  const dispatch = useDispatch();

  const onChangeUserAssess = (event: any) => {
    dispatch(updateUserAssess({ ...userAssess, name: event.target?.value, hasError: false }));
  };

  const onChangeUserWasAssessed = (event: any) => {
    dispatch(
      updateUserWasAssessed({ ...userWasAssessed, name: event.target?.value || '', hasError: false }));
  };

  const onChangeUserWasAssessedType = (event: any) => {
    const type = parseInt(event.target.value);
    const name = type === UserWasAssessedType.Self ? userAssess.name : '';
    dispatch(updateUserWasAssessed({ ...userWasAssessed, type, name, hasError: false }));
  };

  return (
    <div>
      <Image
        src={HangoutImage}
        className="mb-3 border-gray-400 rounded-lg" alt="background hangout"
      />

      <div className={`p-2 md:p-3 lg:p-4 mb-3 border-gray-400 rounded-lg bg-white ${userAssess?.hasError &&
      'border border-red-500'}`}>
        <div className="text-lg mb-2">
          Người thực hiện đánh giá <span className="text-red-600">*</span>
        </div>
        <div className="w-3/4 md:w-2/3">
          <Input autoFocus={true} placeholder="Your answer" className="w-full" value={userAssess?.name || ''}
                 onChange={onChangeUserAssess}/>
        </div>

        {
          userAssess?.hasError &&
          (
            <div>
              <p className="mt-2 text-xs text-red-600"><ErrorIcon className="mr-2"/>Câu hỏi này là bắt buộc</p>
            </div>
          )
        }
      </div>

      <div className={`p-2 md:p-3 lg:p-4 mb-3 border-gray-400 rounded-lg bg-white ${userWasAssessed?.hasError &&
      'border border-red-500'}`}>
        <div className="text-lg mb-2">
          Người được đánh giá <span className="text-red-600">*</span>
        </div>

        <RadioGroup
          aria-label="gender"
          name="controlled-radio-buttons-group"
          value={userWasAssessed.type}
          onChange={onChangeUserWasAssessedType}
        >
          <FormControlLabel value={UserWasAssessedType.Self} control={<Radio/>}
                            label={UserWasAssessedTitle[UserWasAssessedType.Self]}/>
          <FormControlLabel value={UserWasAssessedType.Other} control={
            <Radio/>
          }
                            label={UserWasAssessedTitle[UserWasAssessedType.Other]}/>
        </RadioGroup>

        {
          userWasAssessed?.type === UserWasAssessedType.Other &&
          <div className="w-3/4 md:w-2/3 px-2 pt-0 mt-0">
            <Input autoFocus={true} placeholder="Your answer" className="w-full" value={userWasAssessed?.name || ''}
                   onChange={onChangeUserWasAssessed}/>
          </div>
        }

        {
          userWasAssessed?.hasError &&
          (
            <div>
              <p className="mt-2 text-xs text-red-600"><ErrorIcon className="mr-2"/>Câu hỏi này là bắt buộc</p>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Information;
