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
});

export const addJobAsyncPrepare = (clientName,contactNumber,make,model,year,services,costing,serviceCharge) => dispatch => {

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
  const response = await db.collection("jobs").doc(id).set({
    jobId, clientName,contactNumber,make,model,year,services,costing,serviceCharge, due, dateCreated, timeCreated, dateUpdated, timeUpdated, fullDateTime
  })
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
      state.jobs = action.payload;
    }
  },
  extraReducers: {
    [fetchJobs.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchJobs.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.jobs = [];
      state.jobs = state.jobs.concat(action.payload);
    },
    [fetchJobs.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addJobAsync.pending]: (state, action) => {
      state.status = 'loading'
    },
    [addJobAsync.fulfilled]: (state, action) => {
      state.jobs = [];
      state.status = 'idle'
      toast.dark('Successfully added! 😃', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        });
    },
    [addJobAsync.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
      toast.error('Execution failed! 😨', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        });
    },
    [editJobAsync.pending]: (state, action) => {
      state.status = 'loading'
    },
    [editJobAsync.fulfilled]: (state, action) => {
      state.jobs = [];
      state.status = 'idle'
      toast.dark('Successfully updated! 😃', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        });
    },
    [editJobAsync.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
      toast.error('Execution failed! 😨', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        });
    },
    [deleteJobAsync.pending]: (state, action) => {
      state.status = 'loading'
    },
    [deleteJobAsync.fulfilled]: (state, action) => {
      state.jobs = [];
      state.status = 'idle'
      toast.dark('Successfully deleted! 😃', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        });
    },
    [deleteJobAsync.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
      toast.error('Execution failed! 😨', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        });
    }
  }
});

export const { getAllJobs } = jobsSlice.actions;

export const selectJobs = state => state.jobs.jobs;

export default jobsSlice.reducer;
