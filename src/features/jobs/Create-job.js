import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addJobAsync } from './jobsSlice.js';
import { BrowserRouter as Router, Switch, Route,useHistory, Redirect } from 'react-router-dom';
import './createJobStyles.css';
import NumberFormat from 'react-number-format';


const CreateJob = () => {
    const [jobId, setJobId] = useState('');
    const [clientName, setClientName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [services, setServices] = useState('');
    const [costing, setCosting] = useState(0);
    const [serviceCharge, setServiceCharge] = useState(0);
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

    const onCreateJobClicked = (e) => {
        console.log(serviceCharge);
        e.preventDefault();
        if (clientName && contactNumber && make && model && year && services && costing && serviceCharge) {
            setErrorMessage('');
            dispatch(addJobAsync(clientName,contactNumber,make,model,year,services,costing,serviceCharge));
            setClientName('');
            setContactNumber('');
            setMake('');
            setModel('');
            setYear('');
            setServices('');
            setCosting('');
            setServiceCharge('');
            history.push('/home/all-jobs');
            document.documentElement.scrollTop = 0;
        } else {
            window.scrollTo(0, 0);
            setErrorMessage('** All fields are required! **');
        }
    }

    return (
        <div className="jobContainer">
            <div className="createJobForm">
                <h2>Enter new job:</h2>
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
                        type="number"/>
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
                        type="number"></input>
                        <label htmlFor="serviceCharge">Service Charge:</label>
                        <input 
                        placeholder="Service charge"
                        value={serviceCharge}
                        onChange={onServiceChargeChanged}
                        type="number"/>
                        
                        <button onClick={onCreateJobClicked}>Create Job</button>
                    </form>
            </div>
        </div>
    )
}

export default CreateJob;
