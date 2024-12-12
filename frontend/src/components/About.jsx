import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-us">
      <div className="about-header">
        <h1>About Us</h1>
        <p>Welcome to our e-commerce platform where you can buy new items and sell second-hand goods easily.</p>
      </div>
      
      <div className="section mission">
        <h2>Our Mission</h2>
        <p>
          We aim to provide a seamless shopping experience for our customers, while also offering a platform to 
          sell items you no longer need. We believe in sustainability and giving products a second life.
        </p>
      </div>

      <div className="section what-we-offer">
        <h2>What We Offer</h2>
        <ul>
          <li>Wide range of new products</li>
          <li>Platform to sell second-hand items</li>
          <li>Easy and secure payment options</li>
          <li>Fast and reliable shipping</li>
          <li>Excellent customer support</li>
        </ul>
      </div>

      <div className="section core-values">
        <h2>Our Core Values</h2>
        <p>We stand by our values of <span className="highlight">trust</span>, <span className="highlight">quality</span>, and <span className="highlight">customer satisfaction</span>.</p>
      </div>

      <div className="section our-team">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src="team-member1.jpg" alt="Team Member 1" />
            <h3>Himani</h3>
            
          </div>
          <div className="team-member">
            <img src="team-member2.jpg" alt="Team Member 2" />
            <h3>Himanshi</h3>
            
          </div>
          <div className="team-member">
            <img src="team-member3.jpg" alt="Team Member 3" />
            <h3>Heena</h3>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;