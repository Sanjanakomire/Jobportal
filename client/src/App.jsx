import 'quill/dist/quill.snow.css';
import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import RecruiterLogin from './components/RecruiterLogin';
import { AppContext } from './context/AppContext';
import AddJob from './pages/AddJob';
import Applications from './pages/Applications';
import ApplyJob from './pages/ApplyJob';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import ManageJobs from './pages/ManageJobs';
import ViewApplications from './pages/ViewApplications';

const App = () => {
  const { showRecruiterLogin } = useContext(AppContext);

  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/applications" element={<Applications />} />
        {/* Nested Routing for Dashboard */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="add-job" element={<AddJob />} />
          <Route path="manage-jobs" element={<ManageJobs />} />
          <Route path="view-applications" element={<ViewApplications />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
