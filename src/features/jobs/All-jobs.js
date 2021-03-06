import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route,useHistory, Redirect } from 'react-router-dom';
import { selectJobs } from './jobsSlice.js';
import './allJobStyles.css';
import NumberFormat from 'react-number-format';
import { deleteJobAsync, getAllJobs } from './jobsSlice.js';
import { fetchJobs  } from './jobsSlice';
import { db } from '../../firebase/firebase';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paginator from 'react-hooks-paginator';


const AllJobs = () => {
  const jobs = useSelector(selectJobs);
  const history = useHistory();
  const dispatch = useDispatch();
  const jobStatus = useSelector(state => state.jobs.status);
  const error = useSelector(state => state.jobs.error);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [data, setData] = useState([]);
  const pageLimit = 5;

  const [open, setOpen] = React.useState(false);
  const [dialogId, setDialogId] = React.useState('');
  const [dialogClient, setDialogClient] = React.useState('');

  const handleSearchInput = event => {
    setSearchTerm(event.target.value);
  };

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

  const results = !searchTerm
    ? currentData
    : jobs.filter(job =>
        job.clientName.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      );

  let content;

  if(jobStatus === 'loading'){
    content = <div className="centerHourglass"><div className="lds-hourglass"></div></div>
  } else if(jobStatus === 'succeeded') {
      content = <div>

      <div className="paginationContainer">      
      <div>
      {!searchTerm &&
      <Paginator
        totalRecords={jobs.length}
        pageLimit={pageLimit}
        pageNeighbours={1}
        setOffset={setOffset}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />}
      </div>
      <div className="searchContainer">
        <input 
        className="searchInput" 
        type="text" 
        placeholder=" Search by client name..."
        value={searchTerm}
        onChange={handleSearchInput}
         />
      </div>
      </div>

      {results.map((job) => (
        <div className="jobRow" key={job.jobId}>
            <div className="jobCol"><div>Client Name:</div> {job.clientName}</div>
            <div className="jobCol"><div>Contact:</div> {job.contactNumber}</div>
            <div className="jobCol"><div>Model:</div> {job.model}</div>
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
    {<Dialog
        key={dialogId}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
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
        </Dialog>}

        <div className="paginationBottomContainer">
        { !searchTerm && 
        <Paginator
        totalRecords={jobs.length}
        pageLimit={pageLimit}
        pageNeighbours={1}
        setOffset={setOffset}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
        }
      </div>

    <button className="addJobButton" onClick={() => {history.push('/home/create-jobs')}}>+</button>

    </div>
  } else if(jobStatus === 'failed') {
    content = <div style={{color: "white"}}>{error}</div>
  }

  useEffect(() => {
    if (jobStatus === 'idle') {
      dispatch(fetchJobs());
    }
  }, [jobStatus, dispatch])

  useEffect(() => {
    setData(jobs);
  }, []);

  useEffect(() => {
    setCurrentData(jobs.slice(offset, offset + pageLimit));
  }, [offset, jobs]);

  useEffect(() => {
    const results = jobs.filter(job =>
      job.clientName.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);

    return (
        <div className="jobContainerParent">
            {content}
        </div>
    )
}

export default AllJobs;