import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'
import { useAuth } from '../../context/auth'
import moment from 'moment'
import { Select } from "antd"

const { Option } = Select


function AdminOrders() {
    const [status, setStatus] = useState(["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"])
    const [changeStatus, setChangeStatus] = useState("")
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();

    const getOrders = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/api/v1/auth/all-orders");
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);
    const handlechange = async (orderId, value) => {
        try {
            const { data } = await axios.put(`http://localhost:8080/api/v1/auth/order-status/${orderId}`, { status: value, });
            toast.success("Status updated successfully");
            getOrders();


        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");

        }
    }

    return (

        <div>
            <Layout>
                <div className="container-fluid m-3 p-3">
                    <div className="row">
                        <div className="col-md-3">
                            <AdminMenu />
                        </div>
                        <div className="col-md-9">
                            <h1>All Orders</h1>
                            {orders.length === 0 ? (
                                <p>No orders found.</p>
                            ) : (
                                orders.map((o, i) => (
                                    <div className="card mb-4 shadow-sm" key={i}>
                                        <div className="card-header bg-primary text-white">
                                            <h5 className="mb-0">Order #{i + 1} - {o?.status}</h5>
                                        </div>
                                        <div className="card-body">
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <h6>Order Details</h6>
                                                    <p><strong>Buyer:</strong> {o?.buyer?.name}</p>
                                                    <p><strong>Address:</strong> {o?.buyer?.address}</p>
                                                    <p><strong>Transaction ID:</strong> {o?.payment?.transaction?.id}</p>
                                                    <p><strong>Order Date:</strong> {moment(o?.createdAt).fromNow()}</p>
                                                </div>
                                                <div className="col-md-6">
                                                    <h6>Payment & Shipping</h6>
                                                    <p><strong>Amount:</strong> ${o?.payment?.transaction?.amount}</p>
                                                    <div>
                                                        <p><strong>Status:</strong></p>
                                                        <Select
                                                            value={o?.status}
                                                            className="form-select"
                                                            onChange={(value) => { handlechange(o._id, value); }}
                                                        >
                                                            {status?.map((s, i) => (
                                                                <Option key={i} value={s}>{s}</Option>
                                                            ))}
                                                        </Select>
                                                    </div>

                                                    <p><strong>Quantity:</strong> {o?.products?.length}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <h6 className="mb-3">Products</h6>
                                                {o?.products?.map((p, idx) => (
                                                    <div className="col-md-4" key={idx}>
                                                        <div className="card mb-3">
                                                            <img
                                                                src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                                                                alt={p?.name}
                                                                className="card-img-top"
                                                                style={{ height: '200px', objectFit: 'cover' }}
                                                            />
                                                            <div className="card-body">
                                                                <h6 className="card-title">{p?.name}</h6>
                                                                <p className="card-text">${p?.price}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </Layout>

        </div>
    )
}

export default AdminOrders
