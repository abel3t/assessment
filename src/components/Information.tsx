import React from 'react';
import { Input } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { useDispatch } from 'react-redux';
import { updateUserAssess } from '../slices/assessment-questions.slice';

interface InformationProps {
  userAssess?: any;
}

const Information: React.FC<InformationProps> = ({ userAssess }) => {
  const dispatch = useDispatch();

  const onChangeUserAssess = (event: any) => {
    dispatch(updateUserAssess({ ...userAssess, name: event.target?.value || '', hasError: false }));
  };

  return (
    <div>
      <div className="mb-3 border-gray-400 rounded-lg bg-white ${hasError &&
      'border border-red-500">
        <img src="/hangout.png" className="border-gray-400 rounded-lg" alt="background hangout"/>
      </div>


      <div className={`p-2 md:p-3 lg:p-4 mb-3 border-gray-400 rounded-lg bg-white ${userAssess?.hasError &&
      'border border-red-500'}`}>
        <div className="text-lg mb-2">
          Người thực hiện đánh giá <span className="text-red-600">*</span>
        </div>
        <div className="w-1/2">
          <Input placeholder="Your answer" className="w-full" value={userAssess?.name || ''} onChange={onChangeUserAssess}/>
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
    </div>
  );
};

export default Information;
