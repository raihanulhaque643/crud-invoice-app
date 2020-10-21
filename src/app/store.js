import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import jobsReducer from '../features/jobs/jobsSlice';


export default configureStore({
  reducer: {
    counter: counterReducer,
    jobs: jobsReducer
  },
});
