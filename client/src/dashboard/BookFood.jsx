import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const BookFood = () => {
  const { foodId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const food = state?.food;
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `http://localhost:3050/food/${foodId}/book`,
        { address },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      setError(false);
      setMessage("Food booked successfully.");
      // After a short delay, go back to dashboard food list
      setTimeout(() => navigate("/dashboard/food"), 800);
    } catch (err) {
      console.error(err);
      setError(true);
      setMessage("Failed to book food. Please try again.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Book Food</h1>
      {food && (
        <div style={{ marginBottom: "1rem" }}>
          <h2>{food.foodName}</h2>
          <p>
            Type: {food.foodTag} | Quantity: {food.quantity} {food.quantityUnit || "kg"}
          </p>
          <p>Address: {food.address}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <label htmlFor="address">Your Address</label>
        <textarea
          id="address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows={4}
          style={{
            width: "100%",
            margin: "0.5rem 0",
            color: "#000",
            backgroundColor: "#fff",
          }}
          required
        />
        <button type="submit" className="food-btn">
          Confirm Booking
        </button>
        {message && (
          <p
            style={{
              marginTop: "1rem",
              color: error ? "red" : "green",
            }}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default BookFood;
