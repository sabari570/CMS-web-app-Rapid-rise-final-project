import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout.component.jsx";
import Loginpage from "./pages/loginPage/Loginpage.component";
import Registerpage from "./pages/registerPage/Registerpage.component";
import Homepage from "./pages/homePage/Homepage.component";
import Contactspage from "./pages/contactsPage/Contactspage.component.jsx";
import UserprofilePage from "./pages/userProfilePage/UserprofilePage.component.jsx";
import Errorpage from "./pages/errorPage/Errorpage.component.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoading } from "./store/loading/loading.selector.js";
import { selectShowSplash } from "./store/splash/splash.selector";
import Loader from "./components/Loader/Loader.component.jsx";
import { Toaster } from "react-hot-toast";
import CreateContactpage from "./pages/createContactPage/CreateContactpage.component.jsx";
import ContactEditPage from "./pages/contactEditPage/ContactEditPage.component.jsx";
import useOnlineStatus from "./hooks/useOnlineStatus.js";
import NetworkConnectionErrorPage from "./pages/networkConnectionErrorPage/NetworkConnectionErrorPage.component.jsx";
import LandingPage from "./pages/landingPage/LandingPage.component.jsx";
import SplashScreen from "./components/splashScreen/SplashScreen.component.jsx";
import { setShowSplash } from "./store/splash/splash.reducer.js";
import ForgotPassword from "./pages/forgotPasswordPage/ForgotPassword.component.jsx";
import ResetPassword from "./pages/resetPasswordPage/ResetPassword.component.jsx";

const App = () => {
  const loading = useSelector(selectIsLoading);
  const isOnline = useOnlineStatus();
  const showSplash = useSelector(selectShowSplash);
  const dispatch = useDispatch();

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (!hasVisited) {
      console.log("User has opened the app for the first time in this session");
      sessionStorage.setItem("hasVisited", "true");
      dispatch(setShowSplash(true));
    } else {
      console.log("User has reloaded the app");
    }
  }, [dispatch]);

  if (!isOnline) {
    return <NetworkConnectionErrorPage />;
  }
  return (
    <>
      {showSplash && <SplashScreen />}
      {!showSplash && (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="dashboard" element={<Homepage />} />
            <Route path="login" element={<Loginpage />} />
            <Route path="register" element={<Registerpage />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route
              path="reset-password/:id/:token"
              element={<ResetPassword />}
            />
            <Route path="contacts" element={<Contactspage />} />
            <Route path="create-contact" element={<CreateContactpage />} />
            <Route path="edit-contact/:id" element={<ContactEditPage />} />
            <Route path="profile" element={<UserprofilePage />} />
          </Route>
          <Route path="/*" element={<Errorpage />} />
        </Routes>
      )}
      {loading && <Loader />}
      <Toaster />
    </>
  );
};

export default App;
