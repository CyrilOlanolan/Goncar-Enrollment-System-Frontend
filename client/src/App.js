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
  BatchesCreation,
  Courses
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
        <Route path="/batches/new" element={<BatchesCreation />} />

        <Route path="/employees" element={<Employees />} />
        <Route path="/finance" element={<Finance />} />

        <Route path="/administrative" element={<Administrative />} />
        <Route path="/administrative/courses" element={<Courses />} />

        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
