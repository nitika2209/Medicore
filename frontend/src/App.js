import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
// import Home from './pages/Home';
import { useState } from 'react';

// import styles
import './styles/global.css';

// Import Appointment Pages
import AppointmentList from './pages/Appointments/AppointmentList';


// Import Home Page
import Home from './pages/Home';
import CreateAppointment from './pages/Appointments/CreateAppointment';
import ModifyAppointmentPatient from './pages/Appointments/ModifyAppointmentPatient';
import ModifyAppointmentDoctor from './pages/Appointments/ModifyAppointmentDoctor';

// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <div className="App">
      {/* <Header /> */}
      <Routes>
        {/* <Route path="/testAppointment/:appointmentId" element={<Appointments />} /> */}
        
        {/* login routes */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        
        {/* Appointment Routes */}
        <Route path="/getAppointments" element={<AppointmentList />} />
        <Route path="/bookAppointment" element={<CreateAppointment />} />
        <Route path="/modifyAppointment/:appointmentId" element={<ModifyAppointmentPatient />} />
        <Route path="/doctorUpdateAppointment/:appointmentId" element={<ModifyAppointmentDoctor />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;