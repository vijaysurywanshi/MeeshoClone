import React from 'react';
import Layout from '../../components/layout/Layout';
import UserMenu from '../../components/layout/UserMenu';
import { useAuth } from '../../context/auth';
import { FaUser, FaEnvelope, FaHome, FaEdit } from 'react-icons/fa'; // Importing icons from react-icons
import { useNavigate } from 'react-router-dom'


function Dashboard() {
  const [auth] = useAuth();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container-fluid mt-4 p-3">
        <div className="row">
          <div className="col-md-3 mb-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div 
              className="card w-100 p-4" 
              style={{
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
                borderRadius: '10px',
                animation: 'fadeIn 1s ease-in-out'
              }}
            >
              <h3 className="mb-4" style={{ fontSize: '1.75rem', fontWeight: 'bold', textAlign: 'center' }}>Profile Information</h3>
              
              {/* Table for cleaner presentation */}
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td>
                      <FaUser style={{ marginRight: '8px', color: '#007bff' }} />
                      <strong>Name:</strong>
                    </td>
                    <td>{auth?.user?.name}</td>
                  </tr>
                  <tr>
                    <td>
                      <FaEnvelope style={{ marginRight: '8px', color: '#007bff' }} />
                      <strong>Email:</strong>
                    </td>
                    <td>{auth?.user?.email}</td>
                  </tr>
                  <tr>
                    <td>
                      <FaHome style={{ marginRight: '8px', color: '#007bff' }} />
                      <strong>Address:</strong>
                    </td>
                    <td>{auth?.user?.address || 'No address provided'}</td>
                  </tr>
                </tbody>
              </table>

              {/* Edit Button */}
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard/user/profile')}
                  className="btn btn-primary"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'fadeInUp 1s ease-in-out',
                  }}
                >
                  <FaEdit style={{ marginRight: '8px' }} />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </Layout>
  );
}

export default Dashboard;
