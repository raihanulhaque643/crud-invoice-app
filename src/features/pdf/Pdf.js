import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { useSelector } from 'react-redux';

// Create styles
const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: '0px 50px',
    flexGrow: 1,
    width: '100%',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    color: 'grey'
  },
  alignRight: {
    textAlign: 'right'
  },
  column: {
  
  },
  row: {
  display: 'flex',
  border: '1px solid grey',
  margin: '20px'
  }
});

// Create Document Component
const Pdf = ({match}) => {
    const { jobId } = match.params;

    const job = useSelector(state =>
      state.jobs.value.find(job => job.jobId === jobId)
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
        <div style={styles.row}>
          <div style={styles.col}>
          Client Name:
          </div>
          <div style={styles.col}>
          {job.clientName}
          </div>
        </div>
        <div style={styles.row}>
          <div style={styles.col}>
          Contact number:
          </div>
          <div style={styles.col}>
          {job.contactNumber}
          </div>
        </div>
        <div style={styles.row}>
          <div style={styles.col}>
          Vehicle:
          </div>
          <div style={styles.col}>
          {job.make}{' '}
          {job.model}{' '}
          {job.year}
          </div>
        </div>
        <div style={styles.row}>
          <div style={styles.col}>
          Services:
          </div>
          <div style={styles.col}>
          {job.services}
          </div>
        </div>
        <div style={styles.row}>
          <div style={styles.col}>
          Costing:
          </div>
          <div style={styles.col}>
          {job.costing}
          </div>
        </div>
        <div style={styles.row}>
          <div style={styles.col}>
          Service charge:
          </div>
          <div style={styles.col}>
          {job.serviceCharge}
          </div>
        </div>
        <div style={styles.row}>
          <div style={styles.col}>
          Due amount:
          </div>
          <div style={styles.col}>
          {job.due}
          </div>
        </div>
      </View>
    </Page>
  </Document>
    )
};

export default Pdf;