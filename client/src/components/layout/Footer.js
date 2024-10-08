import React from 'react'
import { Link } from 'react-router-dom';
import ios from '../../Assets/androidios.png'
import android from '../../Assets/play.png'

function Footer() {
  return (
    <footer className=" py-4" style={{backgroundColor: '#f9e2f9' }} >
      <div className="container" >
        <div className="row">
          <div className="col-md-3">
            <h5>Shop Non-Stop on Meesho</h5>
            <p>Trusted by more than 1 Crore Indians</p>
            
          </div>
          <div className="col-md-3">
            <h5>Company</h5>
            <ul className="list-unstyled">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/careers">Careers</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Legal and Policies</h5>
            <ul className="list-unstyled">
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Use</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Reach out to us</h5>
            <div className="social-icons">
              {/* Add social media icons here */}
            </div>
          </div>
        </div>
      </div>
      <div className='row  justify-content-center'>
              <img src={ios} alt="App Store" className="col-md-2"  />
              <img src={android} alt="Play Store" className="col-md-2"  />
            </div>
    </footer>
  )
}

export default Footer
