import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'

import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [answer, setAnswer] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/v1/auth/forgot-password', {
                email,
                newPassword,
                answer
            });
            if (res && res.data.success) {
                toast.success(res.data.message);
                console.log("login success");
               
                navigate( '/login');
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
            <h1 className="text-center">Reset Password</h1>
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
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            required
                            type="text"
                            className="form-control"
                            id="exampleInputPassword"
                            placeholder="Enter Your Secret Question Answer"
                            autoComplete="off"
                        />
                    </div>



                    <div className="mb-3">
                        <input
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            type="password"
                            className="form-control"
                            id="exampleInputPassword"
                            placeholder="Enter Your Password"
                            autoComplete="off"
                        />
                    </div>

                    <div className="mb-3">

                        <button type="submit" className="btn btn-primary">Reset Password</button>
                    </div>
                </form>
            </div>

        </Layout>
    )
}

export default ForgotPassword
