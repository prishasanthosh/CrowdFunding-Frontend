const About=()=>{
    return(
        <>
        <div id="about">
        
        <div className="about-container">
            <h1>Fundraising and CrowdFunding</h1>
            <p>Fundraising is the act of gathering financial support for a cause, mission, or project 
                through donations from generous individuals and organizations. 
                Crowdfunding takes this concept further, enabling individuals to raise 
                small contributions from a large community, often via online platforms, 
                to bring their ideas or dreams to life.</p>
        

        {/* <div className="about-card"> */}
        <h2>What can you raise funds for?</h2>
        <div className="funds-container">
          <div className="fund-card">
            <img src="/ngo.jpeg"></img>
          </div>
          <div className="fund-card">
          <img src="/medical.jpeg"></img>
          </div>
          <div className="fund-card">
          <img src="/educational.jpeg"></img>
          </div>
          <div className="fund-card">
          <img src="/animals.jpg"></img>
          </div>
          <div className="fund-card">
          <img src="/emergency.jpeg"></img>
          </div>
        </div>
      </div>
      </div>
        </>
    )
}
export default About;