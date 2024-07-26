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

const App = () => {
  const loading = useSelector(selectIsLoading);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="login" element={<Loginpage />} />
          <Route path="register" element={<Registerpage />} />
          <Route path="contacts" element={<Contactspage />} />
          <Route path="create-contact" element={<CreateContactpage />} />
          <Route path="edit-contact/:id" element={<ContactEditPage />} />
          <Route path="profile" element={<UserprofilePage />} />
          <Route path="*" element={<Errorpage />} />
        </Route>
      </Routes>
      {loading && <Loader />}
      <Toaster />
    </>
  );
};

export default App;
