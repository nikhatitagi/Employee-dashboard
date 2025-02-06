import { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";
import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    axios.get("http://localhost:3000/employees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  // Filter employees based on search and status
  const filteredEmployees = employees.filter((employee) => {
    return (
      employee.name.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "All" || employee.status === statusFilter)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">Employee Dashboard</h1>

      {/* Link to Register New Employee */}
      <Link to="/register" className="mb-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">Register New Employee</Link>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search employees..."
        className="p-2 w-full mb-4 border rounded shadow"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Status Filter */}
      <select
        className="p-2 border rounded mb-4 shadow"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Online">Online</option>
        <option value="Offline">Offline</option>
      </select>

      {/* Employee List */}
      {filteredEmployees.length === 0 && <p className="text-red-500 text-center">Employee not found</p>}

      <div className="bg-white shadow-md rounded-lg p-4">
        {filteredEmployees.map((employee) => ( 

          <div key={employee.id} className="block p-3 border-b">
            <div className="flex justify-between">
              <Link to={`/employee/${employee.id}`} className="font-semibold text-lg text-blue-500 hover:underline">{employee.name}</Link>

              <span className={`px-2 py-1 rounded ${employee.status === "Online" ? "bg-green-500 text-white" : "bg-gray-400 text-white"}`}>
                {employee.status}
              </span>
            </div>
            <p className="text-gray-600">{employee.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
