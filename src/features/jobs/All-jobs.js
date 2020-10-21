import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectJobs } from './jobsSlice.js';
import './allJobStyles.css';

const AllJobs = () => {
  const jobs = useSelector(selectJobs);
  const dispatch = useDispatch();
    return (
        <div>
            {jobs.map((job) => (
        <div className="job" key={job.jobId}>{job.clientName}</div>
        ))}
        </div>
    )
}

export default AllJobs;
