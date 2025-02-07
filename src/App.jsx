import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import EmployeeList from "./EmployeeList";
import EmployeeDetail from "./EmployeeDetail";
import RegisterEmployee from "./EmployeeRegister";

function App() {
  return (
    <Router>
<Routes>
  <Route path="/" element={<Dashboard />} /> 
  <Route path="/employees" element={<EmployeeList />} />
  <Route path="/employee/:id" element={<EmployeeDetail />} />
  <Route path="/register" element={<RegisterEmployee />} />

      </Routes>
    </Router>
  );
}

export default App;
