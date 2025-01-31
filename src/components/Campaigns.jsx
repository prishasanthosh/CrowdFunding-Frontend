import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderIn from "./HeaderIn"; // Importing the header component
import axios from 'axios';  // Import axios for making API calls

const Campaigns = ({ fundraisers, setFundraisers }) => {
  const navigate = useNavigate();

  const categories = [
    "Education",
    "Health",
    "Environment",
    "Animal Welfare",
    "Community Support",
    "Arts and Culture",
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch fundraisers from the database
  useEffect(() => {
    // Replace with your actual API endpoint
    axios
      .get("https://crowdfunding-hoo1.onrender.com/api/campaigns")  // Replace with your API endpoint
      .then((response) => {
        setFundraisers(response.data);  // Update state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching fundraisers:", error);
      });
  }, [setFundraisers]);

  // Filter fundraisers based on selected category & search query
  const filteredFundraisers = fundraisers.filter((f) => {
    const matchesCategory = selectedCategory
      ? f.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;
    const matchesSearch = f.title.toLowerCase().includes(searchQuery.trim().toLowerCase());
    console.log("matchesCategory:", matchesCategory); // Debugging category match
    console.log("matchesSearch:", matchesSearch); // Debugging search match
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="campaigns-container">
      {/* ✅ Using the modular HeaderIn component */}
      <HeaderIn />

      <main className="main-content">
        {/* Sidebar for Categories */}
        <aside className="sidebar">
          <h2>Categories</h2>
          <ul>
            <li
              className={!selectedCategory ? "active" : ""}
              onClick={() => setSelectedCategory(null)}
            >
              All Campaigns
            </li>
            {categories.map((category, index) => (
              <li
                key={index}
                className={selectedCategory === category ? "active" : ""}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </aside>

        {/* Fundraisers Section */}
        <section className="content">
          <div className="search-add">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search for fundraiser"
              className="search-box"
              value={searchQuery}
              onChange={(e) => {
                console.log(e.target.value);  // Debugging to ensure the value updates
                setSearchQuery(e.target.value);  // Update state on text input
              }}
              style={{ zIndex: 9999 }} // Ensure it's on top
            />
            <div className="add-fundraiser-btn-container">
              <button
                className="add-fundraiser-btn"
                onClick={() => navigate("/add-fundraiser")}
              >
                Add Fundraiser
              </button>
            </div>
          </div>

          <div className="fundraisers">
            {filteredFundraisers.length > 0 ? (
              filteredFundraisers.map((fundraiser, index) => (
                <div key={index} className="fundraiser">
                  <h3>{fundraiser.title}</h3>
                  <p>Category: {fundraiser.category}</p>
                  <p>Funds Required: ${parseFloat(fundraiser.fundsReq).toFixed(2)}</p>
                  <p>Collected: ${parseFloat(fundraiser.collected).toFixed(2)}</p>
                  <button
                    className="donate-btn"
                    onClick={() => alert(`Thank you for supporting "${fundraiser.title}"!`)}
                  >
                    Donate
                  </button>
                </div>
              ))
            ) : (
              <p>No fundraisers available for this category.</p>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 FundMe</p>
      </footer>
    </div>
  );
};

export default Campaigns;
