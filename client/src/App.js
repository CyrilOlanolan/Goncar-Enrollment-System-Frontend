import React from 'react';
import { Routes, Route } from "react-router-dom";
import {
  SignIn,
  Dashboard,
  Trainees,
  Batches,
  Employees,
  Finance,
  Administrative,
  Settings,
  TraineeProfileCreation,
  TraineeRegistrationEdit,
  TraineeProfile,
  TraineeProfileEdit,
  TraineeRegistrationCreation,
  BatchCreation,
  Courses,
  TrainingYears,
  TrainingYearsCreation,
  TrainingYearsEdit,
  BatchEdit,
  Course,
  CourseCreation,
  CourseEdit,
  EmployeeProfile,
  EmployeeProfileCreation,
  EmployeeProfileEdit
} from "./components/ComponentIndex";

function App() {
  return (
    /* GO BACK: window.history.go(-1) */
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* TRAINEE ROUTES */}
        <Route path="/trainees" element={<Trainees />} />
        <Route path="/trainees/:traineeID" element={<TraineeProfile />} />
        <Route path="/trainees/new" element={<TraineeProfileCreation />} />
        
        <Route path="/trainee/edit" element={<TraineeProfileEdit />} />

        {/* TRAINEE REGISTRATION ROUTES */}
        <Route path="/trainee/registrations/new" element={<TraineeRegistrationCreation />} />
        <Route path="/trainee/registration/edit" element={<TraineeRegistrationEdit />} />

        {/* BATCHES ROUTES */}
        <Route path="/batches" element={<Batches />} />
        <Route path="/batches/new" element={<BatchCreation />} />
        <Route path="/batch/edit" element={<BatchEdit />} />

        {/* EMPLOYEES ROUTES */}
        <Route path="/employees" element={<Employees />} /> 
        <Route path="/employees/:employeeID" element={<EmployeeProfile />} /> 
        <Route path="/employees/new" element={<EmployeeProfileCreation />} /> 
        <Route path="/employees/edit" element={<EmployeeProfileEdit />} /> 

        <Route path="/finance" element={<Finance />} />

        <Route path="/administrative" element={<Administrative />} />

        {/* COURSES ROUTES */}
        <Route path="/administrative/course/view/:courseID" element={<Course />} />
        <Route path="/administrative/courses/new" element={<CourseCreation />} />
        <Route path="/administrative/course/edit" element={<CourseEdit />} />
        <Route path="/administrative/courses" element={<Courses />} />
        
        <Route path="/administrative/training-years" element={<TrainingYears />} />
        <Route path="/administrative/training-years/new" element={<TrainingYearsCreation />} />
        <Route path="/administrative/training-years/edit" element={<TrainingYearsEdit />} />

        <Route path="/settings" element={<Settings />} />

        {/* ERROR PAGE */}
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
