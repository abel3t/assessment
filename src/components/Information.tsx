import React, { useState } from 'react';
import { Input } from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { UserWasAssessedTitle, UserWasAssessedType } from '../constant';

const Information: React.FC = () => {
  const [ userWasAssessed, setUserWasAssessed ] = useState(-1);

  const handleChange = (event: any) => {
    setUserWasAssessed(parseInt(event.target.value));
  };

  let hasError = false;

  return (
    <div>
      <div className="mb-3 border-gray-400 rounded-lg bg-white ${hasError &&
      'border border-red-500">
        <img src="/hangout.png" className="border-gray-400 rounded-lg" alt="background hangout"/>
      </div>


      <div className={`p-2 md:p-3 lg:p-4 mb-3 border-gray-400 rounded-lg bg-white ${hasError &&
      'border border-red-500'}`}>
        <div className="text-lg mb-2">
          Người thực hiện đánh giá <span className="text-red-600">*</span>
        </div>
        <div className="w-1/2">
          <Input placeholder="Your answer" className="w-full"/>
        </div>
      </div>

      <div className={`p-2 md:p-3 lg:p-4 mb-3 border-gray-400 rounded-lg bg-white ${hasError &&
      'border border-red-500'}`}>
        <div className="text-lg mb-2">
          Người được đánh giá <span className="text-red-600">*</span>
        </div>

        <RadioGroup
          aria-label="option"
          name="controlled-radio-buttons-group"
          value={userWasAssessed}
          onChange={handleChange}
          sx={{ justifyContent: 'space-around' }}
          className="w-2/3 md:w-1/2"
        >
          <FormControlLabel
            style={{ margin: 0, padding: 0 }}
            value={UserWasAssessedType.Myself} control={<Radio/>}
            label={UserWasAssessedTitle[UserWasAssessedType.Myself]}/>
        </RadioGroup>
      </div>
    </div>
  );
};

export default Information;
