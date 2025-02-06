import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(false); // State to handle error

  useEffect(() => {
    axios.get(`http://localhost:3000/employees/${id}`)
      .then((response) => {
        console.log(response.data); // Debugging log to check response

        if (response.data) {
          console.log("Employee found:", response.data); // Log if employee is found

          setEmployee(response.data);
        } else {
          console.log("Employee not found."); // Log if employee is not found
          setError(true); // Set error if employee does not exist

        }
      })
      .catch((error) => {
        console.error("Error fetching employee details:", error);
        setError(true); // Set error on fetch failure
      });
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Employee does not exist.</h1>
        <p>Please register a new employee.</p>
        <Link to="/register" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">Register New Employee</Link>
      </div>
    );
  }

  if (!employee) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">{employee.name}</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Role:</strong> {employee.role}</p>
        <p><strong>Status:</strong> {employee.status}</p>
        <p><strong>Last Active:</strong> {employee.last_active}</p>
        <Link to="/" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">Back to Dashboard</Link>
        <Link 
          to="/register" 
          state={{ 
            name: employee.name, 
            role: employee.role, 
            email: employee.email, 
            status: employee.status, 
            last_active: employee.last_active 
          }} 
          className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200">
          Edit Employee
        </Link>
      </div>
    </div>
  );
};

export default EmployeeDetails;
