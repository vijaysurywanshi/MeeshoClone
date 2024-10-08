import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import './register.css'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/v1/auth/login', {
                email,
                password
            });
            if (res && res.data.success) {
                toast.success(res.data.message);
                console.log("login success");
                setAuth({ ...auth, user: res.data.user, token: res.data.token });
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(location.state || '/');
            } else {
                toast.error(res.data.message || "Login failed. Please try again.");
                console.log("login error");
            }
        } catch (error) {
            console.log("login error", error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <Layout>
            <h1 className="text-center">Log In</h1>
            <div className="register">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            type="email"
                            className="form-control"
                            id="exampleInputEmail"
                            placeholder="Enter Your Email"
                            autoComplete="off"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            type="password"
                            className="form-control"
                            id="exampleInputPassword"
                            placeholder="Enter Your Password"
                            autoComplete="off"
                        />
                    </div>

                    <div className="mb-3">

                    <button type="submit" className="btn btn-primary">Log In</button>
                    </div>
                        <button type="button" className="btn btn-primary" onClick={() => navigate('/forgot-password')}>Forgot Password</button>
                </form>
            </div>
        </Layout>
    );
}

export default Login;
