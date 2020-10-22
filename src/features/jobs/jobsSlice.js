import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    value: [
        {
            jobId: 'xCG234nd6',
            clientName: 'Raihanul Haque',
            contactNumber: '555 555 555',
            make: 'Toyota',
            model: 'Fielder',
            year: '2005',
            services: 'Paint job, wheel change, mobil change, howler installation, engine overhaul',
            costing: '50000',
            serviceCharge: '15000',
            date: '14-08-2020',
            due: '65000'
        },
        {
            jobId: 'xCG234nd7',
            clientName: 'Hasib Zunair',
            contactNumber: '666 666 666',
            make: 'Toyota',
            model: 'Axios',
            year: '2010',
            services: 'New gear box installation',
            costing: '80000',
            serviceCharge: '18000',
            date: '1-06-2020',
            due: '98000'
        },
        {
            jobId: 'xCG234nd8',
            clientName: 'Shadman Ahmed',
            contactNumber: '777 777 777',
            make: 'Suzuki',
            model: 'Gixxer Sf',
            year: '2017',
            services: 'Clutch repair',
            costing: '2500',
            serviceCharge: '2000',
            date: '17-08-2020',
            due: '4500'
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
    addJob: {
      reducer(state, action) {
        state.value.unshift(action.payload);
      },
      prepare(clientName,contactNumber,make,model,year,services,costing,serviceCharge) {
        const dueAmount = Number(costing) + Number(serviceCharge);
        return {
          payload: {
            jobId: uuidv4(),
            clientName,
            contactNumber,
            make,
            model,
            year,
            services,
            costing,
            serviceCharge,
            due: `${dueAmount}`
          }
        }
      }
    },
    editJob: (state, action) => {
      state.value += action.payload;
    },
    deleteJob: (state, action) => {
        state.value += action.payload;
    },
  },
});

export const { getAllJobs, addJob, editJob, deleteJob } = jobsSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

export const addJobAsync = (jobId,clientName, contactNumber, make, year, services, costing, serviceCharge) => dispatch => {
  setTimeout(() => {
    dispatch(addJob(jobId,clientName,contactNumber,make,year,services,costing, serviceCharge));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectJobs = state => state.jobs.value;

export default jobsSlice.reducer;
