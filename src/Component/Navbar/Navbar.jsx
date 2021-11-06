import React from 'react';
import { NavLink , useLocation } from 'react-router-dom';
import jwt_decode from "jwt-decode";

export default function Navbar() {
  let token = localStorage.getItem('token');
  if(token)
  {
    var decoded = jwt_decode(token); 
  }
  let location = useLocation();
  function logout()
  {
    localStorage.removeItem('token');
  }
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container py-1">
            <NavLink className="navbar-brand fs-4 fw-bolder" to="/home"><i class="far fa-sticky-note"></i> Notes</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto pt-2 mb-2 mb-lg-0">
                {location.pathname=='/home'?<>
                  <li className="nav-item">
                  <a className="nav-link h4 px-5">Welcome {token?<span>{decoded.first_name}</span>:""} </a> 
                  </li>
                  <li className="nav-item">
                  <NavLink onClick={logout} activeClassName="text-info" className="nav-link h5 px-2" to="/signin">LogOut</NavLink>
                  </li>
                  </>
                  :<>
                  <li className="nav-item">
                  <NavLink activeClassName="text-info" className="nav-link h5 px-2" to="/signin">SignIn</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink activeClassName="text-info" className="nav-link h5 px-2" to="/signup">SignUp</NavLink>
                  </li>
                </>
                }
              </ul>
            </div>
          </div>
        </nav>
      </>
    )
}
