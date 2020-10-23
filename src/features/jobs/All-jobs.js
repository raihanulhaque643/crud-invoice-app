import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route,useHistory, Redirect } from 'react-router-dom';
import { selectJobs } from './jobsSlice.js';
import './allJobStyles.css';
import NumberFormat from 'react-number-format';
import { deleteJobAsync } from './jobsSlice.js';

const AllJobs = () => {
  const jobs = useSelector(selectJobs);
  const history = useHistory();
  const dispatch = useDispatch();
    return (
        <div className="jobContainerParent">
            {jobs.map((job) => (
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
                    <div className="jobCol"><div>Billed on:</div> {job.dateCreated} {job.timeCreated}</div>
                    <div className="jobCol">
                    <button className="jobViewButton">View</button>
                    </div>
                    <div className="jobCol">
                    <button className="jobEditButton" onClick={() => {history.push(`/home/edit-job/${job.jobId}`)}}>Edit</button>
                    </div>
                    <div className="jobCol">
                    <button className="jobDeleteButton" onClick={() => {dispatch(deleteJobAsync(`${job.jobId}`))}}>Delete</button>
                    </div>
                </div>
            ))}
            <button className="addJobButton" onClick={() => {history.push('/home/create-jobs')}}>+</button>
        </div>
    )
}

export default AllJobs;
