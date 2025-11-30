import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FoodCard from "./FoodCard";

const BookHistory = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const res = await axios.get("http://localhost:3050/historyfoods", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const all = res.data || [];
        setItems(all);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="food" style={{ padding: "1rem", width: "100%" }}>
      <h1>Booked Food History (Last 3 months)</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          width: "100%",
          maxHeight: "calc(100vh - 200px)",
          overflowY: "auto",
          paddingRight: "0.5rem",
        }}
      >
        {items.map((item) => (
          <FoodCard
            key={item._id}
            name={item.foodName}
            quantity={item.quantity}
            quantityUnit={item.quantityUnit}
            date={item.expiryDate}
            madeDate={item.madeDate}
            expiryHours={item.expiryHours}
            address={item.address}
            tag={item.foodTag}
          />
        ))}
        {items.length === 0 && <p>No booked items in the last 3 months.</p>}
      </div>
    </div>
  );
};

export default BookHistory;
