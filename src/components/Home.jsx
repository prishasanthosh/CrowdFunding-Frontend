import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",  // Added name for sign-up
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between Sign Up and Sign In forms

  // Check for existing token in localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Redirect to dashboard if token exists
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post(
        "https://crowdfunding-hoo1.onrender.com/login", 
        {
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Store token in localStorage
        if (formData.rememberMe) {
          localStorage.setItem("rememberMe", true);
        }

        alert("Login successful!");
        navigate("/campaigns");

        // Fetch data after successful login
        fetchData(response.data.token);
      } else {
        setError("No token received");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post(
        "https://crowdfunding-hoo1.onrender.com/signup", // Sign Up API
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.data.message === "User created successfully") {
        alert("Account created successfully! Please sign in.");
        setIsSignUp(false); // Switch back to Sign In
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Sign up failed. Please try again.";
      setError(errorMessage);
    }
  };

  const fetchData = async (token) => {
    try {
      const response = await axios.get("https://crowdfunding-hoo1.onrender.com/api/campaigns", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div id='home'>
      <div className="home-content">
        <div className="left-side">
          <h1>Start Fundraisers</h1>
          <h1>& Raise Funds</h1>
          <h1>through CROWDFUNDING</h1>
        </div>
        <div className="right-side">
          <form className="form" onSubmit={isSignUp ? handleSignUp : handleSignIn}>
            {isSignUp && (
              <div className="flex-column">
                <label>Name</label>
                <div className="inputForm">
                  <input
                    id="name"
                    name="name"
                    placeholder="Enter your Name"
                    className="input"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}

            <div className="flex-column">
              <label>Email</label>
            </div>
            <div className="inputForm">
              <input
                id="email"
                name="email"
                placeholder="Enter your Email"
                className="input"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex-column">
              <label>Password</label>
            </div>
            <div className="inputForm">
              <input
                id="password"
                name="password"
                placeholder="Enter your Password"
                className="input"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {!isSignUp && (
              <div className="flex-row">
                <div>
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <label>Remember me</label>
                </div>
                <span className="span">Forgot password?</span>
              </div>
            )}
            <button className="button-submit" type="submit">
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>
          {error && <div className="error-message">{error}</div>}
          <div className="toggle-form">
            <button onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
