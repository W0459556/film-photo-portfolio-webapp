import React, { useState } from 'react';
import Main from './components/Main';
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';
import Footer from './components/Footer';
import Register from './components/Register';
import ProtectedRoutes from './components/ProtectedRoutes';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateForm from './components/CreateForm';
import EditForm from './components/EditForm';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('isLoggedIn') == 'true');

  const checkLoginFunc = () => {
    if (sessionStorage.getItem('isLoggedIn') == 'true') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  return (
    <Router>
      <React.Fragment>
        <NavBar isLoggedIn={isLoggedIn} checkLoginFunc={checkLoginFunc} />
        <div id="main-content">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signin" element={<SignIn checkLoginFunc={checkLoginFunc} />} />
            <Route path="/register" element={<Register checkLoginFunc={checkLoginFunc} />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/createform" element={<CreateForm />} />
              <Route path="/edit/:id" element={<EditForm />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </React.Fragment>
    </Router>
  );
};

export default App;
