import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout.component.jsx";
import Loginpage from "./pages/loginPage/Loginpage.component";
import Registerpage from "./pages/registerPage/Registerpage.component";
import Homepage from "./pages/homePage/Homepage.component";
import Contactspage from "./pages/contactsPage/Contactspage.component.jsx";
import UserprofilePage from "./pages/userProfilePage/UserprofilePage.component.jsx";
import Errorpage from "./pages/errorPage/Errorpage.component.jsx";
import { useSelector } from "react-redux";
import { selectIsLoading } from "./store/loading/loading.selector.js";
import Loader from "./components/Loader/Loader.component.jsx";
import { Toaster } from "react-hot-toast";
import CreateContactpage from "./pages/createContactPage/CreateContactpage.component.jsx";
import ContactEditPage from "./pages/contactEditPage/ContactEditPage.component.jsx";
import useOnlineStatus from "./hooks/useOnlineStatus.js";
import NetworkConnectionErrorPage from "./pages/networkConnectionErrorPage/NetworkConnectionErrorPage.component.jsx";
import LandingPage from "./pages/landingPage/LandingPage.component.jsx";

const App = () => {
  const loading = useSelector(selectIsLoading);
  const isOnline = useOnlineStatus();

  if (!isOnline) {
    return <NetworkConnectionErrorPage />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="dashboard" element={<Homepage />} />
          <Route path="login" element={<Loginpage />} />
          <Route path="register" element={<Registerpage />} />
          <Route path="contacts" element={<Contactspage />} />
          <Route path="create-contact" element={<CreateContactpage />} />
          <Route path="edit-contact/:id" element={<ContactEditPage />} />
          <Route path="profile" element={<UserprofilePage />} />
        </Route>
        <Route path="/*" element={<Errorpage />} />
      </Routes>
      {loading && <Loader />}
      <Toaster />
    </>
  );
};

export default App;
