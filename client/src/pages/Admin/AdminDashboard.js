import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { useAuth } from '../../context/auth'



function AdminDashboard() {
  const [auth, setAuth] = useAuth()
  return (
    <Layout>
      <div className="container-fluid m-3 p-3  ">
        <div className="row">
          <div className="col-md-3">  <AdminMenu /></div>
          <div className="col-md-9">
            <div className='card w-75'>
              <h1> Welcome {auth?.user?.name}</h1>
              <h1> Email: {auth?.user?.email}</h1>
              <h1>Contact : {auth?.user?.phone}</h1>
            </div>
          </div>
        </div>
      </div>
    </Layout>

  )
}

export default AdminDashboard
