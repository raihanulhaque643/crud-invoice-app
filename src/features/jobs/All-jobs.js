import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route,useHistory, Redirect } from 'react-router-dom';
import { selectJobs } from './jobsSlice.js';
import './allJobStyles.css';
import NumberFormat from 'react-number-format';
import { deleteJobAsync, getAllJobs } from './jobsSlice.js';
// import { getAllJobs  } from './jobsSlice';
import { db } from '../../firebase/firebase';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const AllJobs = () => {
  const jobs = useSelector(selectJobs);
  const history = useHistory();
  const dispatch = useDispatch();
  const jobStatus = useSelector(state => state.jobs.status);
  const orderderJobs = jobs.slice().sort((a, b) => b.fullDateTime.localeCompare(a.fullDateTime));

  const [open, setOpen] = React.useState(false);
  const [dialogId, setDialogId] = React.useState('');
  const [dialogClient, setDialogClient] = React.useState('');

  const handleClickOpen = (job) => {
    setOpen(true);
    setDialogId(job.jobId);
    setDialogClient(job.clientName);
  };

  const handleClose = () => {
    setOpen(false);
    setDialogId('');
    setDialogClient('');
  };

  useEffect(() => {
    let unmounted = false;
    let response = [];
    const unsub = db.collection("jobs").onSnapshot((querySnapshot) => {
      response = []
    querySnapshot.forEach((doc) => {
        response.push(doc.data())
    });
    dispatch(getAllJobs(response));
    return () => {
        unsub();
    }
  });
  })

    return (
        <div className="jobContainerParent">
            {jobs && orderderJobs.map((job) => (
                <div className="jobRow" key={job.jobId}>
                    <div className="jobCol"><div>Invoice:</div> {job.jobId}</div>
                    <div className="jobCol"><div>Client Name:</div> {job.clientName}</div>
                    <div className="jobCol"><div>Contact:</div> {job.contactNumber}</div>
                    <div className="jobCol"><div>Model:</div> {job.model}</div>
                    {/* <div className="jobCol"><div>Services:</div> {job.services}</div> */}
                    <div className="jobCol"><div>Due:</div>
                        <div className={`${job.due !== '0' ? "duesUncleared" : ""}`}>
                            <NumberFormat 
                            value={`${job.due}`} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            thousandsGroupStyle="lakh" 
                            prefix={'Tk. '} />
                        </div>
                    </div>
                    <div className="jobCol">
                    <div>Billed on:</div>
                    {job.dateCreated} {job.timeCreated}
                    
                    {job.dateUpdated && 
                    <div><div>Updated on:</div>
                    {job.dateUpdated} {job.timeUpdated}</div>
                    }

                    </div>
                    <div className="jobCol">
                    <button className="jobViewButton" onClick={() => {history.push(`/home/invoices/${job.jobId}`)}}>View</button>
                    </div>
                    <div className="jobCol">
                    <button className="jobEditButton" onClick={() => {history.push(`/home/edit-job/${job.jobId}`)}}>Edit</button>
                    </div>
                    <div className="jobCol">
                    <button className="jobDeleteButton" onClick={() => handleClickOpen(job)}>Delete</button>
                    </div>
                </div>
            ))};
            
            {/* Confirm delete modal/dialog: */}
            <Dialog
                key={dialogId}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                {/* <DialogTitle id="alert-dialog-title">{`${dialogId}`}</DialogTitle> */}
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete invoice of <span style={{fontWeight: 'bold'}}>{dialogClient}</span>?<br/>
                    <small>This action can't be undone.</small>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="default">
                    Cancel
                </Button>
                <Button onClick={() => {dispatch(deleteJobAsync(dialogId));setOpen(false)}} variant="contained" color="secondary" autoFocus>
                    Confirm
                </Button>
                </DialogActions>
                </Dialog>

            <button className="addJobButton" onClick={() => {history.push('/home/create-jobs')}}>+</button>
        </div>
    )
}

export default AllJobs;