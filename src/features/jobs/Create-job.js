import React from 'react';
import './createJobStyles.css';

const CreateJob = () => {
    return (
        <div className="jobContainer">
            <div className="createJobForm">
                <h2>Enter new job:</h2>
                <form>
                        <label htmlFor="name">Client name:</label>
                        <input 
                        placeholder="Client name"
                        type="text"/>
                        <label htmlFor="contact">Contact number:</label>
                        <input 
                        placeholder="Contact number"
                        type="text"/>
                        <label htmlFor="make">Vehicle:</label>
                        <input 
                        placeholder="Make"
                        type="text"/>
                        <label htmlFor="Model">Model:</label>
                        <input 
                        placeholder="Model"
                        type="text"/>
                        <label htmlFor="year">Year:</label>
                        <input 
                        placeholder="Year"
                        type="text"/>
                        <label htmlFor="services">Services:</label>
                        <textarea 
                        placeholder="Details of services requested"
                        type="text"/>
                        <label htmlFor="costing">Costing:</label>
                        <input 
                        placeholder="Costing"
                        type="text"/>
                        <label htmlFor="serviceCharge">Service Charge:</label>
                        <input 
                        placeholder="Service charge"
                        type="text"/>
                        
                        <button>Create Job</button>
                    </form>
            </div>
        </div>
    )
}

export default CreateJob;
