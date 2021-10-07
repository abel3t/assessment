import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';

import type { RootState } from 'settings/store';
import { questions } from '../constant';

export type CounterState = {
  questions: any,
  result: any
};

const initialState: CounterState = {
  questions: questions.reduce((acc: any, question) => {
    acc[question.id] = { ...question };
    return acc;
  }, {}),
  result: null
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
        state.questions[id] = { ...state.questions[id], value };
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
