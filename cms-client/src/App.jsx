import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout.component.jsx";
import Loginpage from "./pages/loginPage/Loginpage.component";
import Registerpage from "./pages/registerPage/Registerpage.component";
import Homepage from "./pages/homePage/Homepage.component";
import Errorpage from "./pages/errorPage/Errorpage.component.jsx";

const App = () => {
  // const SERVER_URL = "http://localhost:8000/api";
  // const signInWithGoogleHandler = (e) => {
  //   window.open(`${SERVER_URL}/auth/google`, "_self");
  // };

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="login" element={<Loginpage />} />
          <Route path="register" element={<Registerpage />} />
          <Route path="*" element={<Errorpage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
