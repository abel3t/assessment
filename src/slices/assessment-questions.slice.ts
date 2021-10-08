import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';

import type { RootState } from 'settings/store';
import { questions } from '../constant';

export type AssessmentQuestionState = {
  questions: any,
  userAssess: Record<string, any>
};

const initialState: AssessmentQuestionState = {
  questions: questions.reduce((acc: any, question) => {
    acc[question.id] = { ...question };
    return acc;
  }, {}),
  userAssess: {}
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
    }
  }
});

export const {
  updateQuestionValue,
  updateQuestionError,
  updateQuestions,
  updateUserAssess
} = assessmentQuestionSlice.actions;

export const getQuestions = (state: RootState) => state.assessmentQuestion.questions;
export const getUserAssess = (state: RootState) => state.assessmentQuestion.userAssess;

export default assessmentQuestionSlice.reducer;
