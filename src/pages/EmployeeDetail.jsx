import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3000/employees/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setEmployee(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching employee details:", error);
        setError(true);
      });
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Error fetching employee details.</h1>
        <Link to="/" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  if (!employee) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Employee Details</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold">{employee.name}</h2>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Role:</strong> {employee.role}</p>
        <p><strong>Status:</strong> {employee.status}</p>
        <p><strong>Last Active:</strong> {employee.last_active}</p>
        <Link to="/" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default EmployeeDetail;
