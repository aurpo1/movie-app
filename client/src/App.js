import React from "react";
import {
  BrowserRouter,
  Route,
//  Link,
  Routes
} from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import auth from "./hoc/auth";

function App() {

  const AuthLandingPage = auth(LandingPage, null);
  const AuthLoginPage = auth(LoginPage, false);
  const AuthRegisterPage = auth(RegisterPage, false);

  return (
  <div className="App">
  
  <BrowserRouter>
    <Routes>

      <Route exact path="/" element = {<AuthLandingPage/>}/>

      <Route exact path="/login" element = {<AuthLoginPage/>}/>

      <Route exact path="/register" element = {<AuthRegisterPage/>}/>

    </Routes>
  </BrowserRouter>
  </div>
  );
}


export default App
