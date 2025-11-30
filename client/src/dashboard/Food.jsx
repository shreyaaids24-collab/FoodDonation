import React, { useState, useEffect } from "react";
import FoodCard from "./FoodCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Food.css";

const Food = () => {
  const [food, setFood] = useState([]);
  const [selectedTag, setSelectedTag] = useState("all");
  const [view, setView] = useState("active"); // active | history
  const navigate = useNavigate();

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/allfoods", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFood(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTagChange = (event) => {
    setSelectedTag(event.target.value);
  };

  const now = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  const byTag =
    selectedTag === "all"
      ? food
      : food.filter((item) => item.foodTag === selectedTag);

  const filteredFood = byTag.filter((item) => {
    const createdAt = item.createdAt ? new Date(item.createdAt) : null;
    if (view === "history") {
      // history: ordered or picked within last 3 months
      const isCompleted = item.status === "ordered" || item.status === "picked";
      const inLastThreeMonths = createdAt && createdAt >= threeMonthsAgo && createdAt <= now;
      return isCompleted && inLastThreeMonths;
    }
    // active view: hide ordered/picked items
    const isCompleted = item.status === "ordered" || item.status === "picked";
    return !isCompleted;
  });

  return (
    <div className="food">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

          width: "100%",
        }}
      >
        <h1>Food Available</h1>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          <button
            className="food-view-btn"
            onClick={() => setView("active")}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              border: view === "active" ? "2px solid red" : "1px solid #ccc",
              backgroundColor: view === "active" ? "#ffe5e5" : "#fff",
              cursor: "pointer",
            }}
          >
            Available
          </button>
          <button
            className="food-view-btn"
            onClick={() => setView("history")}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              border: view === "history" ? "2px solid red" : "1px solid #ccc",
              backgroundColor: view === "history" ? "#ffe5e5" : "#fff",
              cursor: "pointer",
            }}
          >
            History (Last 3 months)
          </button>
        </div>
        <div
          className="tags"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <label htmlFor="tags">Filter by tag:</label>
          <select
            id="tags"
            name="tags"
            value={selectedTag}
            onChange={handleTagChange}
            style={{
              padding: "0.5rem",
              borderRadius: "0.5rem",
              border: "1px solid #ccc",
            }}
          >
            <option value="all">All</option>
            <option value="veg">Veg</option>
            <option value="nonveg">Non Veg</option>
          </select>
        </div>
      </div>
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
        {filteredFood.map((item) => (
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
            onBook={
              view === "active"
                ? () =>
                    navigate(`/dashboard/book/${item._id}`, {
                      state: { food: item },
                    })
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Food;
