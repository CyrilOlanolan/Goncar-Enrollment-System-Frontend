import { jsPDF } from 'jspdf';

export async function printTraineeData(traineeData) {
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();

    console.log(traineeData); //NASA TRAINEE DATA TANAN 

    doc.text("HELLO", 10, 11);
    doc.save(`DATA - ${traineeData.lastName}, ${traineeData.firstName}.pdf`);
}