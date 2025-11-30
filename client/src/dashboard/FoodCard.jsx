import React from "react";
import { FaCalendarAlt, FaCartArrowDown, FaHome } from "react-icons/fa";
import "./FoodCard.css";

const FoodCard = ({ name, quantity, quantityUnit, date, madeDate, expiryHours, address, tag, onBook }) => {
  return (
    <div style={{ padding: "0.5rem" }}>
      <div class="card">
        <p
          style={{
            position: "absolute",
            top: "0.5rem",
            left: "0.5rem",
            padding: "0.5rem 1rem",
            background: "#f5f5f5",
            color: "#333",
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "0.5rem",
          }}
        >
          {tag ? tag : "food"}
        </p>
        <img
          className="foodcard-img"
          src={`https://source.unsplash.com/random/?${name}`}
          alt="Card Image"
        />
        <div class="card-content">
          <h2 className="food-title">{name}</h2>
          <div className="food-details">
            <ul className="icons">
              <li>
                <span className="icons-name">
                  <FaCartArrowDown />
                </span>
                : {quantity} {quantityUnit || "kg"}
              </li>
              <li>
                <span className="icons-name">
                  <FaCalendarAlt />
                </span>
                : Expiry date: {date}
              </li>
              {madeDate && (
                <li>
                  <span className="icons-name">
                    <FaCalendarAlt />
                  </span>
                  : Made on: {madeDate}
                </li>
              )}
              {expiryHours && (
                <li>
                  <span className="icons-name">
                    <FaCalendarAlt />
                  </span>
                  : Stays good for: {expiryHours} hours
                </li>
              )}
              <li>
                <span className="icons-name">
                  <FaHome />
                </span>
                : {address}
              </li>
            </ul>
          </div>
          {onBook && (
            <button
              className="food-btn"
              style={{ marginTop: "0.5rem" }}
              onClick={onBook}
            >
              Book Food
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
