import React, { useState } from "react";
import "../../styles/appointment_styles.css"; // Add your styles here if needed

const CreateAppointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    time: "",
    doctorEmail: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Retrieve JWT token from storage (e.g., localStorage)
    let token = localStorage.getItem("token"); // Replace with your storage method if different
    if (token && token.startsWith("Bearer ")) {
      token = token.slice(7);
    }

    try {
      const response = await fetch("http://localhost:8080/Appointments/createAppointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // Include JWT token in the Authorization header
        },
        body: JSON.stringify({
          doctorEmail: formData.email, // Map `doctor` field to `doctorEmail`
          date: formData.time, // Map `meetingTime` field to `date`
          reason_for_appointment: formData.message, // Map `message` field to `reason_for_appointment`
        }),
      });
  
      if (!response.ok) {
        // Handle non-200 responses
        const errorText = await response.text(); // Get error response as plain text
        console.error("Server error:", errorText);
        alert(`Error: ${response.status} - ${errorText}`);
        return;
      }
  
      const result = await response.json();
      alert(result[0].message); // Show success message
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
      <form 
    onSubmit={handleSubmit} 
    className="form-card"
  > 
    <div>
      <h2>Book an Appointment</h2>
      <text>Feel free to select a time and day to meet your primary care provider!</text>
    </div>
    <div 
      className="form-group"
    >
      <label htmlFor="email">Doctor Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="form-input" /* Using className for styling the input field */
      />
    </div>
    
    <div 
      className="form-group"
    >
      <label htmlFor="time">Date:</label>
      <input
        type="datetime-local"
        id="time"
        name="time"
        min="2024-25-07T00:00"
        max="2030-12-14T00:00"
        value={formData.time}
        onChange={handleChange}
        className="form-input" /* Same styling for this input */
      />
    </div>

    <div 
      className="form-group"
    >
      <label htmlFor="message">Reason For Appointment:</label>
      <textarea
        id="message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        className="form-input" /* Reusing the form-input class for consistency */
      />
    </div>

    <button 
      type="submit"
      className="submit-button" /* Unique class for styling the submit button */
    >
      Schedule Appointment
    </button>
  </form>
  );
};

export default CreateAppointment;
