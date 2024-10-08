import React from 'react'
import { NavLink } from 'react-router-dom';
import MeeshoNavLogo from '../../Assets/MeeshoNavLogo.png'
import { useAuth } from '../../context/auth'
import { toast } from 'react-hot-toast'
import SearchInput from '../Form/SearchInput';
import { useCategory } from '../../hooks/useCategory';
import { useCart } from '../../context/cart';

function Header() {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: null });
    localStorage.removeItem("auth");
    toast.success("Logout Successfull");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg  mt-0" style={ { height: "70px" }}>
        
        <div className="container-fluid ">
          
          <button className="navbar-toggler mt-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon " />
          </button>
          

          <div className="collapse navbar-collapse " id="navbarTogglerDemo01">
            
            <NavLink to="/" className="navbar-brand " ><img src={MeeshoNavLogo} alt="Meseho"  style={ { height: "100% "  , width:" 140px" } }/></NavLink>

              <SearchInput />
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              

              
              <li className="nav-item">
                <NavLink to="/" className="nav-link" aria-current="page" >Home</NavLink>
              </li>



              <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" to="/categories" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Categories
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                  <NavLink className="dropdown-item" to={`/categories`}>
                        All Categories
                      </NavLink>
                  </li>
                  {categories?.map((category) => (
                    <li key={category._id}>
                      <NavLink className="dropdown-item" to={`/category/${category.slug}`}>
                        {category.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>





              {
                !auth?.user ? (
                  <>
                    <li className="nav-item">
                      <NavLink to="/register" className="nav-link" >Register</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/login" className="nav-link" >Log In</NavLink>
                    </li>
                  </>
                ) : (
                  <>


                    <li className="nav-item dropdown">
                      <NavLink className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {auth?.user?.name}
                      </NavLink>
                      <ul className="dropdown-menu">
                        <li>
                          <NavLink
                            to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item" >
                            Dashboard
                          </NavLink>
                        </li>

                        <li><NavLink onClick={handleLogout} to="/login" className="dropdown-item" >Log Out</NavLink>
                        </li>

                      </ul>
                    </li>



                  </>
                )
              }
              <li className="nav-item">
                
                <NavLink to="/cart" className="nav-link" >Cart ({cart?.length}) </NavLink>
              </li>


            </ul>

          </div>
        </div>
      </nav>
      

    </>
  )
}

export default Header
