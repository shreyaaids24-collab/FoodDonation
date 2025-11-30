import React, { useState } from "react";
import axios from "axios";
import "./FoodDonation.css";

function FoodDonation() {
  const [foodName, setFoodName] = useState("");
  const [foodTag, setFoodTag] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [address, setAddress] = useState("");
  const [expiryHours, setExpiryHours] = useState("");
  const [madeDate, setMadeDate] = useState("");
  const [quantityUnit, setQuantityUnit] = useState("kg");
  const [statusMessage, setStatusMessage] = useState("");
  const [statusError, setStatusError] = useState(false);

  const email = localStorage.getItem("email");
  console.log(email);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      foodName,
      foodTag,
      quantity,
      expiryDate,
      expiryHours,
      madeDate,
      quantityUnit,
      address,
      email,
    };
    console.log(formData);
    // Send the form data to the server using fetch or Axios
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/fooddonation",
        {
          formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setStatusError(false);
      setStatusMessage("Food donation submitted successfully.");
      // Optionally clear form
      setFoodName("");
      setFoodTag("");
      setQuantity("");
      setQuantityUnit("kg");
      setExpiryDate("");
      setExpiryHours("");
      setMadeDate("");
      setAddress("");
      return response.data;
    } catch (error) {
      console.error(error);
      setStatusError(true);
      setStatusMessage("Failed to submit food donation. Please try again.");
    }
  };

  return (
    <div className="foodDonation_container">
      <div className="foodDonation_heading">
        <h1 className="heading-foodd">Food Donation</h1>
      </div>
      <div className="foodDonation_wrapper">
        <br></br>
        <br></br>
        <form className="food-donation_form" onSubmit={handleSubmit}>
          <div className="form_element">
            <label htmlFor="foodName">Food name</label>
            <input
              type="text"
              id="foodName"
              name="foodName"
              value={foodName}
              onChange={(event) => setFoodName(event.target.value)}
            />
          </div>
          <div className="form_element">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
          </div>

          <div className="form_element">
            <label htmlFor="quantityUnit">Quantity Unit</label>
            <select
              id="quantityUnit"
              name="quantityUnit"
              value={quantityUnit}
              onChange={(event) => setQuantityUnit(event.target.value)}
            >
              <option value="kg">Kg</option>
              <option value="pieces">Pieces</option>
            </select>
          </div>

          <div className="form_element">
            <label htmlFor="foodTag">Food type or tag</label>
            <select
              id="foodTag"
              name="foodTag"
              value={foodTag}
              onChange={(event) => setFoodTag(event.target.value)}
            >
              <option value="" disabled selected>
                Choose type
              </option>
              <option value="veg" style={{ color: "black" }}>
                Veg
              </option>
              <option value="nonveg" style={{ color: "black" }}>
                Non Veg
              </option>
            </select>
          </div>

          <div className="form_element">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              value={expiryDate}
              onChange={(event) => setExpiryDate(event.target.value)}
            />
          </div>
          <div className="form_element">
            <label htmlFor="expiryHours">How many hours this food will stay</label>
            <input
              type="number"
              id="expiryHours"
              name="expiryHours"
              value={expiryHours}
              onChange={(event) => setExpiryHours(event.target.value)}
            />
          </div>
          <div className="form_element">
            <label htmlFor="madeDate">Date when it is made</label>
            <input
              type="date"
              id="madeDate"
              name="madeDate"
              value={madeDate}
              onChange={(event) => setMadeDate(event.target.value)}
            />
          </div>
          <div className="form_element">
            <label htmlFor="address">Address</label>
            <input
              type="address"
              id="address"
              name="address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </div>
          <button id="foodDonation_submit-btn" type="submit">
            Submit
          </button>
          {statusMessage && (
            <p
              style={{
                marginTop: "1rem",
                color: statusError ? "red" : "green",
              }}
            >
              {statusMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default FoodDonation;
