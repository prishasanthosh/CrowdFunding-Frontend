import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddFundraiser = ({ setFundraisers }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
    fundsReq: "",
    collected: "0", // Default collected amount
    details: "",
    image: null,
    startDate: "", // New start date
    endDate: "", // New end date
  });

  const categories = [
    "Education",
    "Health",
    "Environment",
    "Animal Welfare",
    "Community Support",
    "Arts and Culture",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert to numbers for validation
    const fundsReqNum = parseFloat(form.fundsReq);
    const collectedNum = parseFloat(form.collected);

    // Validate fund requirement and collected amounts
    if (isNaN(fundsReqNum) || fundsReqNum <= 0) {
      alert("Please enter a valid amount for Funds Required.");
      return;
    }
    if (isNaN(collectedNum) || collectedNum < 0) {
      alert("Collected amount cannot be negative.");
      return;
    }
    if (!form.category) {
      alert("Please select a category.");
      return;
    }
    if (!form.details) {
      alert("Please provide some details about the fundraiser.");
      return;
    }
    if (!form.image) {
      alert("Please upload an image.");
      return;
    }

    // Validate start and end date
    if (!form.startDate || !form.endDate) {
      alert("Please provide both start and end dates.");
      return;
    }
    if (new Date(form.startDate) >= new Date(form.endDate)) {
      alert("End date must be later than start date.");
      return;
    }

    // Create new fundraiser object
    const newFundraiser = {
      title: form.title,
      category: form.category,
      fundsReq: `$${fundsReqNum.toFixed(2)}`,
      collected: `$${collectedNum.toFixed(2)}`,
      details: form.details,
      image: form.image.name, // Storing the image filename
      startDate: form.startDate,
      endDate: form.endDate,
    };

    // Update the fundraisers list
    setFundraisers((prevFundraisers) => [...prevFundraisers, newFundraiser]);

    // Redirect back to campaigns
    navigate("/campaigns");
  };

  return (
    <div className="add-fundraiser">
      <h2>Create a New Fundraiser</h2>
      <form onSubmit={handleSubmit} className="fundraiser-form">
        <input
          type="text"
          name="title"
          placeholder="Fundraiser Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <select name="category" value={form.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="fundsReq"
          placeholder="Funds Required ($)"
          value={form.fundsReq}
          onChange={handleChange}
          required
          min="1"
        />
        <input
          type="number"
          name="collected"
          placeholder="Collected Amount ($)"
          value={form.collected}
          onChange={handleChange}
          required
          min="0"
        />
        <textarea
          name="details"
          placeholder="Fundraiser Details"
          value={form.details}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit-btn">
          Create Fundraiser
        </button>
      </form>
    </div>
  );
};

export default AddFundraiser;
