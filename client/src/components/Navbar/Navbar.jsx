import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = ({ token }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/");
  };

  const handleDonateFood = () => {
    if (token) {
      alert("1+token"+token);
      navigate("/dashboard/food");
    } else {
      alert("2+token"+token);
      navigate("/");
    }
  };
  return (
    <nav className="main">
      <div
        className="logo"
        onClick={handleDonateFood}
        style={{ cursor: "pointer" }}
      >
        <h2  style={{
                fontSize: "1.5rem",
              }}>
          Donate 
          <span  style={{
                fontSize: "1.5rem",
              }}> Food</span>
        </h2>
      </div>
      <div className={showMenu ? "nav-items mobile-menu-link" : "nav-items"}>
        <ul>
          {/* <li>
            <button
              style={{
                fontSize: "1.0rem",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "inherit",
              }}
              onClick={handleDonateFood}
            >
              Donate 
            </button>
          </li> */}
          <li>
            <Link
              className="link"
              to="/about"
              style={{
                fontSize: "1.0rem",
              }}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              className="link"
              to="/our-work"
              style={{
                fontSize: "1.0rem",
              }}
            >
              Our Work
            </Link>
          </li>
          <li>
            <Link
              className="link"
              to="/contact"
              style={{
                fontSize: "1.0rem",
              }}
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>

      <div className="header-login">
        {
          // if token is present then show dashboard and logout button else show login and signup button
          token ? (
            <>
              <button className="btn-nav" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <div className="l-btn">
              <Link  className="link" to="/login">
                <button className="btn-nav">Login</button>
              </Link>
              <Link className="link" to="/signup">
                <button className="btn-nav">Signup</button>
              </Link>
            </div>
          )
        }
        <div className="hamburger-menu">
          <a href="#" onClick={handleClick}>
            <GiHamburgerMenu />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
