import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { useState } from 'react';
import Home from './components/Home';
import About from './components/About';
import ActiveFunds from './components/ActiveFunds';
import Contact from './components/Contact';
import Campaigns from "./components/Campaigns";
import AddFundraiser from "./components/AddFundraiser";
import Profile from './components/Profile';

const App = () => {
  const [fundraisers, setFundraisers] = useState([
    { title: "Help Children Learn", category: "Education", fundsReq: "$5000.00", collected: "$2500.00" },
    { title: "Support Health Workers", category: "Health", fundsReq: "$8000.00", collected: "$5000.00" },
    { title: "Save The Forests", category: "Environment", fundsReq: "$7000.00", collected: "$3500.00" },
  ]);

  return (
    <Router>
      <>
        <header>
          <div className="header-container">
            <span className="header-name">CROWDFUNDING</span>
            <nav>
              <ul className="navbar-links">
                <li>
                  <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}>Home</NavLink>
                </li>
                <li>
                  <NavLink to="/about" className={({ isActive }) => (isActive ? 'active-link' : '')}>About</NavLink>
                </li>
                <li>
                  <NavLink to="/fundraiseFor" className={({ isActive }) => (isActive ? 'active-link' : '')}>Fundraise For</NavLink>
                </li>
                <li>
                  <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active-link' : '')}>Contact</NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/fundraiseFor" element={<ActiveFunds />} />
            <Route path="/campaigns" element={<Campaigns fundraisers={fundraisers} setFundraisers={setFundraisers} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/add-fundraiser" element={<AddFundraiser setFundraisers={setFundraisers} />} />
            <Route path="/profile" element={<Profile/>}/>
          </Routes>
        </main>
      </>
    </Router>
  );
};

export default App;
