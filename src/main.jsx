import ReactDOM from "react-dom/client"; // Update the import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeList from "./pages/EmployeeList";
import EmployeeDetails from "./pages/EmployeeDetails";
import EmployeeRegister from "./pages/EmployeeRegister";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")); // Use createRoot
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<EmployeeList />} />
      <Route path="/register" element={<EmployeeRegister />} />
      <Route path="/employee/:id" element={<EmployeeDetails />} />
    </Routes>
  </Router>
);
