import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../firebase/firebase';
import { ToastContainer, toast } from 'react-toastify';

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
  const ref = db.collection("jobs").orderBy("fullDateTime", "desc");
  const response = await ref.get().then((querySnapshot) => {
    let jobsArray =[];
    querySnapshot.forEach(doc => {
      jobsArray.push(doc.data());
    })
    return jobsArray;
  })
  return response
})

export const addJobAsync = createAsyncThunk('jobs/addJob', async (data) => {
  const id = data.jobId;
  const { jobId, clientName,contactNumber,make,model,year,services,costing,serviceCharge, due, dateCreated, timeCreated, fullDateTime } = data;
  db.collection("jobs").doc(id).set({
    jobId, clientName,contactNumber,make,model,year,services,costing,serviceCharge, due, dateCreated, timeCreated, fullDateTime
  })
  .then(function() {
    console.log("Document successfully written!");
    toast.dark('Successfully added! 😃', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      });
  })
  .catch(function(error) {
    console.error("Error writing document: ", error);
    toast.error('Execution failed! 😨', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      });
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

  let fullDateTime = today;

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
    timeCreated,
    fullDateTime
  };

  dispatch(addJobAsync(data));
};

export const editJobAsync = createAsyncThunk('jobs/editJob', async (data) => {
  const id = data.jobId;
  const { jobId, clientName,contactNumber,make,model,year,services,costing,serviceCharge, due, dateCreated, timeCreated, dateUpdated, timeUpdated, fullDateTime } = data;
  db.collection("jobs").doc(id).set({
    jobId, clientName,contactNumber,make,model,year,services,costing,serviceCharge, due, dateCreated, timeCreated, dateUpdated, timeUpdated, fullDateTime
  })
  .then(function() {
    console.log("Document successfully updated!");
    toast.dark('Successfully updated! 😃', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      });
  })
  .catch(function(error) {
    console.error("Error writing document: ", error);
    toast.error('Execution failed! 😨', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      });
});
});

export const editJobAsyncPrepare = (jobId, clientName, contactNumber, make, model, year, services, costing, serviceCharge, due, dateCreated, timeCreated, fullDateTime) => dispatch => {

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

  // let fullDateTime = fullDateTime;

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
    timeUpdated,
    fullDateTime
  };

  dispatch(editJobAsync(data));
};

export const deleteJobAsync = createAsyncThunk('jobs/deleteJob', async (id) => {
  db.collection("jobs").doc(id).delete()
  .then(function() {
    console.log("Document successfully deleted!");
    toast.dark('Successfully deleted! 😃', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      });
  })
  .catch(function(error) {
    console.error("Error removing document: ", error);
    toast.error('Execution failed! 😨', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
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
    getAllJobs: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.jobs = action.payload;
    }
  },
  extraReducers: {
    [fetchJobs.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchJobs.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      state.jobs = action.payload
    },
    [fetchJobs.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addJobAsync.pending]: (state, action) => {
      state.status = 'loading'
    },
    [addJobAsync.fulfilled]: (state, action) => {
      state.status = 'idle'
      // Add any fetched posts to the array
      fetchJobs();
    },
    [addJobAsync.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [editJobAsync.pending]: (state, action) => {
      state.status = 'loading'
    },
    [editJobAsync.fulfilled]: (state, action) => {
      state.status = 'idle'
      // Add any fetched posts to the array
      fetchJobs();
    },
    [editJobAsync.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [deleteJobAsync.pending]: (state, action) => {
      state.status = 'loading'
    },
    [deleteJobAsync.fulfilled]: (state, action) => {
      state.status = 'idle'
      // Add any fetched posts to the array
      fetchJobs();
    },
    [deleteJobAsync.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
});

export const { getAllJobs } = jobsSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectJobs = state => state.jobs.jobs;

export default jobsSlice.reducer;
