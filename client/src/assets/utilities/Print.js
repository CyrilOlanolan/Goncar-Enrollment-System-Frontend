import { green } from '@mui/material/colors';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';

import { stringifyDate } from './datetime';

function getMiddleInitial(name) {
    if (name) {
        return " " + name[0] + ".";
    }
    return "";
}

export async function printTraineeData(traineeData) {
    // FETCH DETAILS
    let deployedURI = 'https://goncar-system-backend.herokuapp.com';
    let registrations = [];

    let transactionLog = [];
    let currentDue;
    let downPayment;
    let totalPayment;
    let balance;

    // REGISTRATIONS    
    await axios.get(`${deployedURI}/api/trainees/${traineeData.traineeId}/registrations`)
    .then((response) => {
        registrations = response.data
    })
    .catch((error) => {
        console.log(error.response)
    })

    // TRANSACTIONS
    await axios.get(`${deployedURI}/api/trainees/${traineeData.traineeId}/transactions/`)
    .then((response) => {
        transactionLog = response.data.transact;
        currentDue = response.data?.trytuition;
        downPayment = 3500;
        totalPayment = response.data?.trypayamount;
        balance = response.data?.trybalance;
    })
    .catch((error) => {
        console.log(error.response)
    })

    // FLATTEN DATA FOR TRANSACTION LOG
    let transactionLogFlatten = [];
    
    for (let transact of transactionLog) {
        let employee = `${transact?.employees?.lastName}, ${transact?.employees?.firstName}${getMiddleInitial(transact?.employees?.middleName)}`
        transactionLogFlatten.push([
            transact?.transactionId,
            transact?.paymentAmount,
            transact?.paymentMethod,
            employee,
            transact?.batchName,
            stringifyDate(transact?.transactionDate)
        ])
    }

    console.log("HERE:", transactionLogFlatten)

    console.log("REGISTRATIONS:", registrations);
    console.log("TRANSACTION LOG: ", transactionLog)
    console.log("CURRENT DUE:", currentDue)
    console.log("DOWNPAYMENT:", downPayment)
    console.log("PAYMENT:", totalPayment)
    console.log("BALANCE", balance)
    console.log("TRAINEE DATA", traineeData)

    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();

    // TRAINEE INFORMATION PRINT
    doc.autoTable({
        theme: 'plain',
        styles: { fontSize: 18, fontStyle: 'bold', textColor: green},

        head: [["Trainee Name:"]],
        body: [[`${traineeData.lastName}, ${traineeData.firstName}`]],

    })

    doc.autoTable({ 
        theme: 'grid',
        styles: {fontSize: 12}, 

        head: [["Trainee ID", "Birthday", "Email", "Sex", "Address"]],
        body:[[`${traineeData.traineeId}`,
                `${stringifyDate(traineeData.birthDay)}`, `${traineeData.emailAdd}`, `${traineeData.sex}`,
                `${traineeData.address}`]],

    })

    doc.autoTable({
        theme: 'grid',
        styles: {fontSize: 12}, 

        head: [["Phone Number", "Educational Attainment", "Year Graduated"]],
        body: [[`${traineeData.cpNum}`, `${traineeData.educationalAttainment}`, `${traineeData.yearGrad}`]],

    })

    doc.autoTable({
        theme: 'grid',
        styles: {fontSize: 12}, 

        head: [["SSS No.", "TIN No.", "SG License No,", "SG License Expiry"]],
        body:[[`${traineeData.SSSNum}`, `${traineeData.TINNum}`, `${traineeData.SGLicense}`,
                `${stringifyDate(traineeData.expiryDate)}`]],
    })

    // AREA FOR TRAINEE REGISTRATION TABLES PRINT

    doc.autoTable({
        theme: 'plain',
        styles: {fontSize: 18},

        head: [["TRAINEE REGISTRATION"]],
        
    })

    doc.autoTable({
        head:  [["Course", "Training Year:", "Batch", "Status"]],
        body: [[`${traineeData.SSSNum}`, "2022-2023", "1", "Active"]],
    })

    // AREA FOR TRANSACTION LOGS TABLES PRINT

    doc.autoTable({
        theme: 'plain',
        styles: {fontSize: 18},
        head: [["TRANSACTION LOGS"]]
    })

    doc.autoTable({
        theme: 'striped',
        styles: {fontSize: 12},

        head:[["Payables", ]]
    })

    doc.autoTable({
        head:  [["Transaction ID", "Transaction Date", "Batch", "Status", "sdasd", "asdasd"]],
        body: transactionLogFlatten,
    })
    
    doc.save(`DATA - ${traineeData.lastName}, ${traineeData.firstName}.pdf`);
}

export async function printRegistrationData(registrationData, traineeData, traineeName) {
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
    
    console.log(registrationData);
    console.log(traineeData);

    doc.autoTable({
        theme: 'plain',
        styles: {fontSize: 18},

        head: [[`Trainee: ${traineeName}`]]
    })

    doc.autoTable({
        style: 'grid',

        head:[["Registration Number", "Course Taken", "Batch ID", "Batch Name"]],
        body:[[`${registrationData.registrationNumber}`, `${registrationData.courseTaken}`, `${registrationData.batchID}`,
            `${registrationData.batchName}`]],                                                                                                                                                                               
    })

    doc.autoTable({
        style: 'grid',

        head: [["Training Year", "Date Enrolled", "Enrollment Status"]],
        body: [[`${registrationData.trainingYear}`, `${stringifyDate(registrationData.dateEnrolled)}`, 
                `${registrationData.enrollmentStatus}`]]
    })

    doc.autoTable({
        theme: 'plain',
        styles: {fontSize: 15},

        head:[["Licenses"]]                     
    })

    doc.autoTable({
        theme: 'striped',
        styles: {fontSize: 12},

        head:[["SSS Number", "TIN Number", "SG License", "SG License Expiry"]],
        body: [[`${registrationData.SSSNumber}`, `${registrationData.TINNumber}`, 
                `${registrationData.SGLicense}`, `${stringifyDate(registrationData.SGLicenseExpiry)}`]],
                
    })

    doc.save(`REGISTRATIONS - ${traineeName}.pdf`);
}