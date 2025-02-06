import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const EmployeeRegister = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("Online");
  const [lastActive, setLastActive] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const employeeData = location.state; // Get employee data from state

  useEffect(() => {
    if (employeeData) {
      setName(employeeData.name);
      setRole(employeeData.role);
      setEmail(employeeData.email);
      setStatus(employeeData.status);
      setLastActive(employeeData.last_active);
    }
  }, [employeeData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const employee = {
      name,
      role,
      email,
      status,
      last_active: lastActive,
    };

    setLoading(true);
    setError("");

    const request = employeeData
      ? axios.put(`http://localhost:3000/employees/${employeeData.id}`, employee)
      : axios.post("http://localhost:3000/employees", employee);

    request
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setError("Error: " + (error.response ? error.response.data : "Network Error"));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Register New Employee</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4">
        <input
          type="text"
          placeholder="Name"
          className="p-2 w-full mb-4 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Role"
          className="p-2 w-full mb-4 border rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="p-2 w-full mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <select
          className="p-2 border rounded mb-4"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
        </select>
        <input
          type="text"
          placeholder="Last Active (e.g., 2024-02-05T10:30:00Z)"
          className="p-2 w-full mb-4 border rounded"
          value={lastActive}
          onChange={(e) => setLastActive(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200" disabled={loading}>
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default EmployeeRegister;
