import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavBar = ({ isLoggedIn, checkLoginFunc }) => {
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2){
      const cookieValue = parts.pop().split(';').shift();
      return cookieValue.replace(/%40/g, '@'); 
    }
    return null;
  };

  useEffect(() => {
    const storedEmail = getCookie('userEmail');
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    axios.post(`${import.meta.env.VITE_API_URL}/users/logout`)
      .then(() => {
        sessionStorage.setItem(`isLoggedIn`, `false`);
        checkLoginFunc();
        navigate('/signin');
      })
      .catch((error) => {
        console.log("Logout error", error);
      });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a href="/#" className="navbar-brand d-flex align-items-center">
        <i class="fa fa-2x fa-camera mr-5 rainbow-pastel"></i><strong>Photo Gallery</strong>
        </a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Home</NavLink>
            </li>
            {!isLoggedIn
              ? (
                <>
                  <li className="nav-item"><NavLink to="/signin" className="nav-link">Log In</NavLink></li>
                  <li className="nav-item"><NavLink to="/register" className="nav-link">Register</NavLink></li>
                </>
              ) : (
                <>
                  <li className="nav-item"><NavLink to="/createform" className="nav-link">Upload Photo</NavLink></li>
                  <li className="nav-item ml-auto">
                    <div className="dropdown">
                      <button className="btn btn-link nav-link dropdown-toggle" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                        {userEmail}
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><button className="dropdown-item" onClick={handleLogout}>Log Out</button></li>
                      </ul>
                    </div>
                  </li>
                </>
              )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
