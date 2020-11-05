import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';

// Create styles
const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fafafa',
    height: ''
  },
  section: {
    margin: '0px 5px',
    padding: '10px 50px',
    flexGrow: 1,
    width: '100%',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 'auto'
  },
  invoice: {
    float: 'right',
    fontSize: '35px',
    fontWeight: 'bold',
    margin: '15px 0px'
  },
  headerStack: {
    display: 'flex',
    flexDirection:'column',
    color: '#000'
  },
  alignRight: {
    textAlign: 'right'
  },
  col: {
    width: '100%',
    padding: '5px',
  },
  row: {
  display: 'flex',
  border: '0.5px',
  margin: '20px',
  padding: '5px',
  width: '100%'
  },
  bold: {
    fontWeight: 'bold'
  }
});

// Create Document Component
const Pdf = ({match}) => {
    const { jobId } = match.params;

    const job = useSelector(state =>
      state.jobs.jobs.find(job => job.jobId === jobId)
    );
    return(
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
      <div style={styles.flexContainer}>
        <Text>Car Garage, Bashundhara R/a</Text>
        <div style={styles.headerStack}>
          <span style={styles.alignRight}>{job.dateCreated}</span>
          <span style={styles.alignRight}>Car Garage</span>
          <span style={styles.alignRight}>Bashundhara R/a</span>
          <span style={styles.alignRight}>garage.app.bd@gmail.com</span>
          <span style={styles.alignRight}>www.facebook.com/info.car.garage.bd</span>
        </div>
      </div>
      <div style={styles.invoice}>
        <div>INVOICE</div>
      </div>
      </View>
      <View style={styles.section}>
        <div style={styles.col}>
        <div style={{...styles.col, ...styles.bold}}>
          Invoice number:
          </div>
          <div style={styles.col}>
          {job.jobId}
          </div>
          <hr/>
          <div style={{...styles.col, ...styles.bold}}>
          Customer:
          </div>
          <div style={styles.col}>
          {' '}
          {job.clientName}
          {', '}
          {job.make}
          {' '}
          {job.model}
          {', '}
          {job.year}
          {' '}
          </div>
          <hr/>
          <div style={{...styles.col, ...styles.bold}}>
          Contact number:
          </div>
          <div style={styles.col}>
          {' '}
          {job.contactNumber}
          </div>
          <hr/>
          <div style={{...styles.col, ...styles.bold}}>
          Services:
          </div>
          <div style={styles.col}>
          {job.services}
          </div>
          <hr/>
            <div style={styles.col}>
                <span style={styles.bold}>Costing:</span><br />
                <NumberFormat 
                  value={`${job.costing}`} 
                  displayType={'text'} 
                  thousandSeparator={true} 
                  thousandsGroupStyle="lakh" 
                  prefix="Tk. "
                  />
            </div>
            <div style={styles.col}>
              <span style={styles.bold}>Service charge:</span><br />
              <NumberFormat 
                  value={`${job.serviceCharge}`} 
                  displayType={'text'} 
                  thousandSeparator={true} 
                  thousandsGroupStyle="lakh" 
                  prefix="Tk. "
                  />
            </div>
            <hr/>
            <div style={styles.col}>
              <span style={styles.bold}>Due:</span><br />
              <NumberFormat 
                  value={`${job.due}`} 
                  displayType={'text'} 
                  thousandSeparator={true} 
                  thousandsGroupStyle="lakh" 
                  prefix="Tk. "
                  />
            </div>
        </div>
      </View>
    </Page>
  </Document>
    )
};

export default Pdf;