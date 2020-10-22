import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectJobs } from './jobsSlice.js';
import './allJobStyles.css';

const AllJobs = () => {
  const jobs = useSelector(selectJobs);
  const dispatch = useDispatch();
    return (
        <div className="jobContainerParent">
            {jobs.map((job) => (
                <div className="jobRow" key={job.jobId}>
                    <div className="jobCol"><div>Invoice:</div> {job.jobId}</div>
                    <div className="jobCol"><div>Client Name:</div> {job.clientName}</div>
                    <div className="jobCol"><div>Contact:</div> {job.contactNumber}</div>
                    <div className="jobCol"><div>Model:</div> {job.model}</div>
                    <div className="jobCol"><div>Services:</div> {job.services}</div>
                    <div className="jobCol"><div>Due:</div> {job.due}</div>
                    <div className="jobCol"><button className="jobEditButton">Edit</button></div>
                    <div className="jobCol"><button className="jobEditButton">View</button></div>
                </div>
            ))}
        </div>
    )
}

export default AllJobs;
