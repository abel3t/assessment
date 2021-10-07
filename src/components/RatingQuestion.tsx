import React from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

interface RatingQuestionProps {
  title: string;
}

const RatingQuestion: React.FC<RatingQuestionProps> = ({ title }) => {
  const [value, setValue] = React.useState('female');

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <div className="p-2 md:p-3 lg:p-4 border-gray-400 rounded-lg bg-white">
      <div className="text-lg mb-2">
        {title}
      </div>

      <div className="flex items-end justify-around">
        <div className="pb-2 w-1/12 md:w-1/6">Không giống tôi</div>
        <RadioGroup
          aria-label="option"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
          sx={{ flexDirection: "row", justifyContent: "space-around" }}
          className="w-2/3 md:w-1/2"
        >
          {
            Options(5)
          }
        </RadioGroup>
        <div className="pb-2 w-1/12 md:w-1/6">
          Rất giống tôi
        </div>
      </div>
    </div>
  );
}

function Options(n: number) {
  const options = [];
  for (let i = 1; i <= n; i++) {
    options.push(
      <FormControlLabel
        style={{ margin: 0, padding: 0 }}
        labelPlacement="top" value={i} control={<Radio />} label={i} key={`key-${i}`}/>
    )
  }

  return options;
}

export default RatingQuestion;
