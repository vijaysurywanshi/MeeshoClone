import React from 'react';
import meshoad from '../../Assets/meshoad.png'; // This will be the mobile image on the right
import { NavLink } from 'react-router-dom';
import playstore from '../../Assets/playstore.jpg'; // Play Store icon for the button

function Advertise() {
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        {/* Left Text Section */}
        <div className="col-md-6">
          <h1 className="fw-bold mb-4" style={{ color: '#333' }}>
            Lowest Prices <br /> 
            Best Quality Shopping
          </h1>
          
          {/* Icons with Descriptions */}
          <div className="d-flex justify-content-between mb-4">
            <div className="text-center">
              <i className="bi bi-truck fs-2 mb-2"></i> {/* Free Delivery Icon */}
              <p>Free Delivery</p>
            </div>
            <div className="text-center">
              <i className="bi bi-cash-coin fs-2 mb-2"></i> {/* Cash on Delivery Icon */}
              <p>Cash on Delivery</p>
            </div>
            <div className="text-center">
              <i className="bi bi-arrow-counterclockwise fs-2 mb-2"></i> {/* Easy Returns Icon */}
              <p>Easy Returns</p>
            </div>
          </div>

          {/* Download Button */}
          <a
            href="https://play.google.com/store/apps/details?id=com.meesho.supply&hl=en_IN&pli=1"
            className="btn btn-primary d-flex align-items-center justify-content-center px-4 py-2"
            style={{ backgroundColor: '#7b1fa2', borderColor: '#7b1fa2' }}
          >
            <img className="me-2" src={playstore} alt="Google Play Store" style={{ width: '24px' }} />
            Download the Meesho App
          </a>
        </div>

        {/* Right Image Section */}
        <div className="col-md-6 text-center">
          <img src={meshoad} className="img-fluid" alt="Meesho Makeover" />
        </div>
      </div>
    </div>
  );
}

export default Advertise;
