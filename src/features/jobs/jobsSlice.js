import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'jobs',
  initialState: {
    value: [
        {
            jobId: '1',
            clientName: 'Raihanul Haque',
            contactNumber: '555 555 555',
            make: 'Toyota',
            model: 'Fielder',
            year: '2005',
            services: 'Paint job',
            costing: '50000',
            serviceCharge: '15000',
            date: '14-08-2020'
        },
        {
            jobId: '2',
            clientName: 'Hasib Zunair',
            contactNumber: '666 666 666',
            make: 'Toyota',
            model: 'Axios',
            year: '2010',
            services: 'New gear box installation',
            costing: '80000',
            serviceCharge: '18000',
            date: '1-06-2020'
        },
        {
            jobId: '3',
            clientName: 'Shadman Ahmed',
            contactNumber: '777 777 777',
            make: 'Suzuki',
            model: 'Gixxer Sf',
            year: '2017',
            services: 'Clutch repair',
            costing: '2500',
            serviceCharge: '2000',
            date: '17-08-2020'
        }
    ],
  },
  reducers: {
    getAllJobs: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    addJob: state => {
      state.value -= 1;
    },
    editJob: (state, action) => {
      state.value += action.payload;
    },
    deleteJob: (state, action) => {
        state.value += action.payload;
    },
  },
});

export const { getAllJobs, addJob, editJob, deleteJob } = counterSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectJobs = state => state.jobs.value;

export default counterSlice.reducer;
