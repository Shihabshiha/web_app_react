import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/redux";
import LoginPage from "./Pages/Login";
import SignupPage from "./Pages/Signup";
import HomePage from "./Pages/Home";
import ProfilePage from "./Pages/Profile";
import AdminLoginPage from "./Pages/AdminLogin";
import AdminHomePage from "./Pages/adminHome";


const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/signup" element={<SignupPage />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route exact path="/admin/login" element={<AdminLoginPage />} />
          <Route exact path="/admin/home" element={<AdminHomePage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
