import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { editJobAsync } from './jobsSlice';

const EditJobForm = ({ match }) => {
  const { jobId } = match.params;

  const job = useSelector(state =>
    state.jobs.value.find(job => job.jobId === jobId)
  );

  const [clientName, setClientName] = useState(job.clientName);
  const [contactNumber, setContactNumber] = useState(job.contactNumber);
  const [make, setMake] = useState(job.make);
  const [model, setModel] = useState(job.model);
  const [year, setYear] = useState(job.year);
  const [services, setServices] = useState(job.services);
  const [costing, setCosting] = useState(job.costing);
  const [serviceCharge, setServiceCharge] = useState(job.serviceCharge);
  const [due, setDue] = useState(job.due);
  const [errorMessage, setErrorMessage] = useState('');


  const dispatch = useDispatch();
  const history = useHistory();

  const onClientNameChanged = e => setClientName(e.target.value);
  const onContactNumberChanged = e => setContactNumber(e.target.value);
  const onMakeChanged = e => setMake(e.target.value);
  const onModelChanged = e => setModel(e.target.value);
  const onYearChanged = e => setYear(e.target.value);
  const onServicesChanged = e => setServices(e.target.value);
  const onCostingChanged = e => setCosting(e.target.value);
  const onServiceChargeChanged = e => setServiceCharge(e.target.value);
  const onDueChanged = e => setDue(e.target.value);

  const onUpdateJobClicked = (e) => {
    e.preventDefault();
    if (clientName && contactNumber && make && model && year && services && costing && serviceCharge && due) {
      setErrorMessage('');
      dispatch(editJobAsync({ jobId: jobId, clientName, contactNumber, make, model, year, services, costing, serviceCharge, due}))
      history.push('/home/all-jobs')
    } else {
      window.scrollTo(0, 0);
      setErrorMessage('** All fields are required! **');
  }
  }

  return (
    <div className="jobContainer">
        <div className="createJobForm">
            <h2>Update job:</h2>
            <h4 style={{color: 'red'}}>{errorMessage? errorMessage : ''}</h4>
            <form>
                    <label htmlFor="clientName">Client name:</label>
                    <input 
                    placeholder="Client name"
                    value={clientName}
                    onChange={onClientNameChanged}
                    type="text"/>
                    <label htmlFor="contact">Contact number:</label>
                    <input 
                    placeholder="Contact number"
                    value={contactNumber}
                    onChange={onContactNumberChanged}
                    type="number"/>
                    <label htmlFor="make">Vehicle:</label>
                    <input 
                    placeholder="Make"
                    value={make}
                    onChange={onMakeChanged}
                    type="text"/>
                    <label htmlFor="model">Model:</label>
                    <input 
                    placeholder="Model"
                    value={model}
                    onChange={onModelChanged}
                    type="text"/>
                    <label htmlFor="year">Year:</label>
                    <input 
                    placeholder="Year"
                    value={year}
                    onChange={onYearChanged}
                    type="text"/>
                    <label htmlFor="services">Services:</label>
                    <textarea 
                    placeholder="Details of services requested"
                    value={services}
                    onChange={onServicesChanged}
                    type="text"/>
                    <label htmlFor="costing">Costing:</label>
                    <input 
                    placeholder="Costing"
                    value={costing}
                    onChange={onCostingChanged}
                    type="number"/>
                    <label htmlFor="serviceCharge">Service Charge:</label>
                    <input 
                    placeholder="Service charge"
                    value={serviceCharge}
                    onChange={onServiceChargeChanged}
                    type="number"/>
                    <label htmlFor="due">Due:</label>
                    <input 
                    placeholder="Due"
                    value={due}
                    onChange={onDueChanged}
                    type="number"/>
                    
                    <button onClick={onUpdateJobClicked}>Update Job</button>
                </form>
        </div>
    </div>
)
}

export default EditJobForm;