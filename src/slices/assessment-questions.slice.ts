import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from 'settings/store';
import { questions, UserWasAssessedType } from '../constant';

export interface IUserAssess {
  name?: string;
  hasError?: boolean;
}

export interface IUserWasAssessed {
  name?: string;
  type?: UserWasAssessedType,
  hasError?: boolean
}

export type AssessmentQuestionState = {
  questions: any,
  userAssess: IUserAssess,
  userWasAssessed: IUserWasAssessed
};

const initialState: AssessmentQuestionState = {
  questions: questions.reduce((acc: any, question) => {
    acc[question.id] = { ...question };
    return acc;
  }, {}),
  userAssess: { name: '' },
  userWasAssessed: { name: '', type: UserWasAssessedType.Self }
};

export const assessmentQuestionSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    updateQuestions: (state, action: PayloadAction<any>) => {
      state.questions = action.payload;
    },
    updateQuestionValue: (state, action: PayloadAction<any>) => {
      const { id, value } = action.payload;
      if (state.questions[id]) {
        state.questions[id] = { ...state.questions[id], value, hasError: false };
      }
    },
    updateQuestionError: (state, action: PayloadAction<any>) => {
      const { id, hasError } = action.payload;
      if (state.questions[id]) {
        state.questions[id] = { ...state.questions[id], hasError };
      }
    },
    updateUserAssess: (state, action: PayloadAction<any>) => {
      state.userAssess = action.payload;
    },
    updateUserWasAssessed: (state, action: PayloadAction<any>) => {
      state.userWasAssessed = action.payload;
    }
  }
});

export const {
  updateQuestionValue,
  updateQuestionError,
  updateQuestions,
  updateUserAssess,
  updateUserWasAssessed
} = assessmentQuestionSlice.actions;

export const getQuestions = (state: RootState) => state.assessmentQuestion.questions;
export const getUserAssess = (state: RootState) => state.assessmentQuestion.userAssess;
export const getUserWasAssessed = (state: RootState) => state.assessmentQuestion.userWasAssessed as IUserWasAssessed;

export default assessmentQuestionSlice.reducer;
