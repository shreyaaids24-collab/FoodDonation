import React, { useEffect } from "react";
import {
  BrowserRouter,
  Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import FoodDonation from "./pages/FoodDonation";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import OurWork from "./pages/OurWork";
import Contact from "./pages/Contact";
import Layout from "./dashboard/Layout";
import Navbar from "./components/Navbar/Navbar";

import Profile from "./dashboard/Profile";
import Food from "./dashboard/Food";
import BookFood from "./dashboard/BookFood";
import BookHistory from "./dashboard/BookHistory";

function App() {
  const token = localStorage.getItem("token");

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <Navbar token={token} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donation" element={<FoodDonation />} />

        <Route path="/about" element={<About />} />
        <Route path="/our-work" element={<OurWork />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {token ? (
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<FoodDonation />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/food" element={<Food />} />
            <Route path="/dashboard/book/:foodId" element={<BookFood />} />
            <Route path="/dashboard/history" element={<BookHistory />} />
          </Route>
        ) : (
          <Route path="*" element={<Login />} />
        )}
      </Routes>
    </>
  );
}

export default App;
