import React from 'react';
import RatingQuestion from '../components/RatingQuestion';

const AssessmentPage: React.FC = () => {
  return (
    <div className="p-2 sm:p-3 md:p-4 lg:p-5 flex flex-col justify-center items-center">
      <div className="w-full md:w-3/4 lg:w-2/3 bg-white mb-2 border-gray-400 rounded-lg">
        <div className="text-3xl text-center text-white rounded-t-lg border-green-100 py-2" style={{ backgroundColor: '#3D8F2E' }}>
          Khảo sát sức khoẻ thuộc linh
        </div>
        <div className="p-2 md:p-3 lg:p-4 text-sm">
          Đời sống môn đồ hóa hiểu đơn giản nhất là hành trình bạn tin Chúa và trở nên giống Chúa Jêsus càng hơn mỗi ngày
        </div>
      </div>

      <div className="w-full md:w-3/4 lg:w-2/3">
        <RatingQuestion
          title="Tôi dễ dàng nhận ra và xưng nhận bất cứ điều gì trong suy nghĩ, hành vi, tâm tánh của tôi mà không giống với Chúa Jêsus"/>
      </div>
    </div>
  );
};

export default AssessmentPage;
