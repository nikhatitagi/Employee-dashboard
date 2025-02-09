import { useEffect, useState } from "react"; 
import { Link } from "react-router-dom"; 
import axios from "axios"; 

const EmployeeList = () => { 
  const [employees, setEmployees] = useState([]); 
  const [error, setError] = useState(false); 
  const [search, setSearch] = useState(""); 
  const [statusFilter, setStatusFilter] = useState("All"); 

  useEffect(() => {
    axios.get("https://your-backend-url.com/employees")

      .then((response) => {
        if (response.status === 200) {
          setEmployees(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setError(true);
      });
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Error fetching employees.</h1>
        <Link to="/register" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
          Register New Employee
        </Link>
      </div>
    );
  }

  if (employees.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">No employees found.</div>;
  }

  // Filter employees based on search and status
  const filteredEmployees = employees.filter((employee) => {
    return (
      employee.name.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "All" || employee.status === statusFilter)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center color text-black">Employee Dashboard</h1>
      <Link to="/register" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
        Register New Employee
      </Link>


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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <div key={employee.id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold">{employee.name}</h2>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Role:</strong> {employee.role}</p>
            <p><strong>Status:</strong> {employee.status}</p>
            <p><strong>Last Active:</strong> {employee.last_active}</p>
            <Link 
              to={`/employee/${employee.id}`} 
              className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
