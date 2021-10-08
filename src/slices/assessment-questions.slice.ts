import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';

import type { RootState } from 'settings/store';
import { questions } from '../constant';

export type AssessmentQuestionState = {
  questions: any,
  name: string,
  userAssess: string,
  userWasAssessed: string,
  result: any
};

const initialState: AssessmentQuestionState = {
  questions: questions.reduce((acc: any, question) => {
    acc[question.id] = { ...question };
    return acc;
  }, {}),
  result: null,
  name: '',
  userAssess: '',
  userWasAssessed: ''
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
    updateResult: (state, action: PayloadAction<any>) => {
      state.result = action.payload;
    },
    updateName: (state, action: PayloadAction<any>) => {
      state.name = action.payload;
    },
    updateUserAssess: (state, action: PayloadAction<any>) => {
      state.name = action.payload;
    },
    updateUserWasAssessed: (state, action: PayloadAction<any>) => {
      state.name = action.payload;
    }
  }
});

export const {
  updateQuestionValue,
  updateQuestionError,
  updateQuestions,
  updateResult
} = assessmentQuestionSlice.actions;

export const getQuestions = (state: RootState) => state.assessmentQuestion.questions;

export default assessmentQuestionSlice.reducer;
