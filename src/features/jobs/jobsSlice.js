import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../firebase/firebase';

export const getJobsAsync = createAsyncThunk('jobs/fetchJobs', async () => {
  const response = [];
  await db.collection("jobs").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        response.push(doc.data())
    });
  });
  return response;
});

export const addJobAsync = createAsyncThunk('jobs/addJob', async (data) => {
  const id = data.jobId;
  const { jobId, clientName,contactNumber,make,model,year,services,costing,serviceCharge, due, dateCreated, timeCreated } = data;
  db.collection("jobs").doc(id).set({
    jobId, clientName,contactNumber,make,model,year,services,costing,serviceCharge, due, dateCreated, timeCreated
  })
  .then(function() {
    console.log("Document successfully written!");
  })
  .catch(function(error) {
    console.error("Error writing document: ", error);
});
});

export const addJobAsyncPrepare = (clientName,contactNumber,make,model,year,services,costing,serviceCharge) => dispatch => {
  // console.log(jobId,clientName, contactNumber, make, year, services, costing, serviceCharge);

  const due = Number(costing) + Number(serviceCharge);

  let today = new Date();

  let dateCreated = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
  const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  let timeCreated = formatAMPM(new Date);

  const jobId = uuidv4();

  const data = {
    jobId,
    clientName,
    contactNumber, 
    make,
    model, 
    year, 
    services, 
    costing, 
    serviceCharge,
    due,
    dateCreated,
    timeCreated
  };

  dispatch(addJobAsync(data));
};

export const editJobAsync = createAsyncThunk('jobs/editJob', async (data) => {
  const id = data.jobId;
  const { jobId, clientName,contactNumber,make,model,year,services,costing,serviceCharge, due, dateCreated, timeCreated, dateUpdated, timeUpdated } = data;
  db.collection("jobs").doc(id).set({
    jobId, clientName,contactNumber,make,model,year,services,costing,serviceCharge, due, dateCreated, timeCreated, dateUpdated, timeUpdated 
  })
  .then(function() {
    console.log("Document successfully updated!");
  })
  .catch(function(error) {
    console.error("Error writing document: ", error);
});
});

export const editJobAsyncPrepare = (jobId, clientName, contactNumber, make, model, year, services, costing, serviceCharge, due, dateCreated, timeCreated) => dispatch => {

  let today = new Date();

  let dateUpdated = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
  const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  let timeUpdated = formatAMPM(new Date);

  const data = {
    jobId,
    clientName,
    contactNumber, 
    make,
    model, 
    year, 
    services, 
    costing, 
    serviceCharge,
    due,
    dateCreated,
    timeCreated,
    dateUpdated,
    timeUpdated
  };

  dispatch(editJobAsync(data));
};

export const deleteJobAsync = createAsyncThunk('jobs/deleteJob', async (id) => {
  db.collection("jobs").doc(id).delete()
  .then(function() {
    console.log("Document successfully deleted!");
  })
  .catch(function(error) {
    console.error("Error removing document: ", error);
  });
});

const initialState = {
  jobs: [],
  status: 'idle',
  error: null
}

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
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

        let today = new Date();
        let dateCreated = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        const formatAMPM = (date) => {
          let hours = date.getHours();
          let minutes = date.getMinutes();
          var ampm = hours >= 12 ? 'pm' : 'am';
          hours = hours % 12;
          hours = hours ? hours : 12; // the hour '0' should be '12'
          minutes = minutes < 10 ? '0'+minutes : minutes;
          let strTime = hours + ':' + minutes + ' ' + ampm;
          return strTime;
        }
        let timeCreated = formatAMPM(new Date);
        
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
            due: `${dueAmount}`,
            dateCreated,
            timeCreated
          }
        }
      }
    },
    editJob: (state, action) => {
      const {jobId, clientName, contactNumber, make, model, year, services, costing, serviceCharge, due} = action.payload;
      const existingPost = state.value.find(job => job.jobId === jobId);
      if (existingPost) {
        existingPost.clientName = clientName;
        existingPost.contactNumber = contactNumber;
        existingPost.make = make;
        existingPost.model = model;
        existingPost.year = year;
        existingPost.services = services;
        existingPost.costing = costing;
        existingPost.serviceCharge = serviceCharge;
        existingPost.due = due;
      }
    },
    deleteJob: (state, action) => {
      const {jobId} = action.payload;
      state.value = state.value.filter(job => job.jobId !== jobId);
    },
  },
  extraReducers: {
    [getJobsAsync.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getJobsAsync.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      // state.jobs = state.jobs.concat(action.payload)
      state.jobs = action.payload
    },
    [getJobsAsync.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
});

export const { getAllJobs, addJob, editJob, deleteJob } = jobsSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectJobs = state => state.jobs.jobs;

export default jobsSlice.reducer;
