import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/employees")
      .then((response) => {
        if (response.status === 200) {
          navigate("/employees");
        }
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, [navigate]);

  return null; // No UI needed, just a redirect
};

export default Dashboard;
