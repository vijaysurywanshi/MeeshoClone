import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

function AdminRoute() {
    const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/v1/auth/admin-auth`);
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        setOk(false); // In case of any error, we assume the user is not authorized
      }
    };
    
    // Check if the user is authenticated with a valid token
    if (auth?.token) authCheck();
  }, [auth?.token]);

  // If verification is successful, render the dashboard; otherwise, show a spinner
  return ok ? <Outlet /> : <Spinner path="/" />;
}

export default AdminRoute;
