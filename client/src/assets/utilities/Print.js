import { green } from '@mui/material/colors';
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';

export async function printTraineeData(traineeData) {
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();

    console.log(traineeData); //NASA TRAINEE DATA TANAN 
    // console.log(trainee);

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
        body:[[`${traineeData.traineeID}`,
                `${traineeData.birthDay}`, `${traineeData.emailAdd}`, `${traineeData.sex}`,
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
                `${traineeData.expiryDate}`]],
    })

    // AREA FOR TRAINEE REGISTRATION TABLES PRINT

    doc.autoTable({
        theme: 'plain',
        styles: {fontSize: 18},

        head: [["TRAINEE REGISTRATION"]],
        
    })

    doc.autoTable({
        head:  [["Course", "Training Year:", "Batch", "Status"]],
        body: [["BSSC", "2022-2023", "1", "Active"]],
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
    
    doc.save(`DATA - ${traineeData.lastName},${traineeData.firstName}.pdf`);
}

    