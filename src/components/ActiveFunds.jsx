import React, { useState } from "react";

function FundraiserCard({ title, fundsReq, collected, image }) {
  const percentage = (parseFloat(collected) / parseFloat(fundsReq)) * 100;
  return (
    <div className="fundraiser-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>Funds Req: ${fundsReq}</p>
      <p>Collected: ${collected}</p>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}

const ActiveFunds = () => {
  const [fundraisers, setFundraisers] = useState([
    {
      title: "Nepal Floods",
      fundsReq: "10000.00",
      collected: "2000.00",
      image: "/flood.avif",
    },
    {
      title: "Cancer Treatment",
      fundsReq: "30000.00",
      collected: "2000.00",
      image: "/patient.jpg",
    },
    {
      title: "Rural Girls Education",
      fundsReq: "3000.00",
      collected: "2000.00",
      image: "/girlchild.jpg",
    },
    {
      title: "Abandoned Pets",
      fundsReq: "1000.00",
      collected: "200.00",
      image: "/dogs.jpg",
    },
  ]);

  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(true);
  };

  const handleShowLess = () => {
    setShowMore(false);
  };

  return (
    <div id="fundraiseFor">
    <div className="fund-container">
      <h2>Active Fundraisers</h2>
      <div className="fundraiser-list">
        {fundraisers.slice(0, showMore ? fundraisers.length : 3).map(
          (fundraiser, index) => (
            <FundraiserCard
              key={index}
              title={fundraiser.title}
              fundsReq={fundraiser.fundsReq}
              collected={fundraiser.collected}
              image={fundraiser.image}
            />
          )
        )}
      </div>
      {!showMore ? (
        <button onClick={handleShowMore}>Show More</button>
      ) : (
        <button onClick={handleShowLess}>Show Less</button>
      )}
    </div>
    </div>
  );
};

export default ActiveFunds;
