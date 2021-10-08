import {
  configureStore
} from '@reduxjs/toolkit';

import assessmentReducer from 'slices/assessment-questions.slice';

export const store = configureStore({
  reducer: {
    assessmentQuestion: assessmentReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
