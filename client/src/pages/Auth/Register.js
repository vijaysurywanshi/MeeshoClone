import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import './register.css'
import { useNavigate } from 'react-router-dom'//this is hook create variable then we can use it
import axios from 'axios';
import toast from 'react-hot-toast';
function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [answer, setAnswer] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/v1/auth/register', {
                name,
                email,
                password,
                phone,
                address,
                answer

            })
            if (res.data.success) {
                toast.success(res.data.message);
                console.log("register success");
                navigate('/login');
            }
            else {
                toast.error(res.data.message || "Registration failed. Please try again."); 
                console.log("register error");
            }

        } catch (error) {
            console.log("register error", error);

            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        }


    }
    return (
        <>
            <Layout>
                <h1 className="text-center">Register</h1>
                <div className="register ">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 ">
                            <input value={name} onChange={(e) => setName(e.target.value)} required type="text" className="form-control" id="exampleInputName" placeholder='Enter Your Name' />
                        </div>
                        <div className="mb-3 ">
                            <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" className="form-control" id="exampleInputEmail" placeholder='Enter Your Email' />
                        </div>
                        <div className="mb-3">
                            <input value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="password" type="password" className="form-control" id="exampleInputPassword" placeholder='Enter Your Password' />
                        </div>
                        <div className="mb-3 ">
                            <input value={phone} onChange={(e) => setPhone(e.target.value)} required type="text" className="form-control" id="exampleInputPhone" placeholder='Enter Your Phone' />
                        </div>
                        <div className="mb-3 ">
                            <input value={address} onChange={(e) => setAddress(e.target.value)} required type="text" className="form-control" id="exampleInputAddress" placeholder='Enter Your Address' />
                        </div>
                        <div className="mb-3  ">
                            < input value={answer} onChange={(e) => setAnswer(e.target.value)} required type="text" className="form-control" id="exampleInputAnswer" placeholder='Whats your Favorite sport' />
                        </div>
                        <button type="submit" className="btn btn-primary ">Register</button>
                    </form>
                </div>
            </Layout>
        </>
    )
}

export default Register
