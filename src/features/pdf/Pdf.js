import React from 'react';
import './viewStyles.css';
import { useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';

const Pdf = ({match}) => {
      const { jobId } = match.params;

    const job = useSelector(state =>
      state.jobs.jobs.find(job => job.jobId === jobId)
    );

  return (
    <div className="pdfContainer">
      <div className="pdfHeader">
        <div className="pdfColumnLeft">
          <span className="headerTitle">Car Garage</span> <br/>
          Bashundhara R/a <br/>
          Automotive Repair Shop <br/>
          garage.app.bd@gmail.com <br/>
          +88019-555-5555, +88019-666-6666
        </div>
        <div className="pdfColumnRight">
          Date: {job.dateCreated}<br/>
          Time: {job.timeCreated} 
        </div>
      </div>
      <div className="banner">
        Invoice
      </div>

      <div className="body-one">
      Order Details: <br/>
        {job.services}
      </div>

      <div className="body-two">
        <div className="pdfColumnLeft">
          Costing:
        </div>
        <div className="pdfColumnRight">
          <NumberFormat 
            value={`${job.costing}`} 
            displayType={'text'} 
            thousandSeparator={true} 
            thousandsGroupStyle="lakh" 
            prefix={'Tk. '} />
        </div>
      </div>

      <div className="body-two">
        <div className="pdfColumnLeft">
          Service charge:
        </div>
        <div className="pdfColumnRight">
          <NumberFormat 
            value={`${job.serviceCharge}`} 
            displayType={'text'} 
            thousandSeparator={true} 
            thousandsGroupStyle="lakh" 
            prefix={'Tk. '} />
        </div>
      </div>

      <div className="body-two">
        <div className="pdfColumnLeft">
          Due amount:
        </div>
        <div className="pdfColumnRight">
          <NumberFormat 
            value={`${job.due}`} 
            displayType={'text'} 
            thousandSeparator={true} 
            thousandsGroupStyle="lakh" 
            prefix={'Tk. '} />
        </div>
      </div>

      <div className="body-two noBorder">
        <div className="pdfColumnLeft">
          Authorized:
        </div>
        <div className="pdfColumnRight signed">
        </div>
      </div>

      <div className="body-two noBorder">
        <div className="pdfColumnLeft">
          Date of authorization:
        </div>
        <div className="pdfColumnRight signed">
        </div>
      </div>

    </div>
  )
}

export default Pdf
