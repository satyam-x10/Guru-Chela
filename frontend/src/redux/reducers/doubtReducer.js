import { createReducer } from '@reduxjs/toolkit';

export const doubtReducer = createReducer(
  {},

  {
    getMyDoubtsSuccess: (state, action) => {
      state.myDoubts=action.payload
      state.loading = false;

    },
    getMyDoubtsFail: (state, action) => {
      state.loading = false;

    },
    getDoubtFail: (state, action) => {
      state.loading = false;

    },
    getDoubtSuccess: (state, action) => {
      state.loading = false;

    },
    createDoubtSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;

    },
    createDoubtFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }

);