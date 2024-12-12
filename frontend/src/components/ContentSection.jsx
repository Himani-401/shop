import React from 'react';
import './ContentSection.css';

const ContentSection = () => {
  return (
    <div className="content-wrapper">
      
      <video className="background-video" autoPlay muted loop>
        <source src="https://media.istockphoto.com/id/1646013782/video/fashion-retail-and-hands-shopping-for-clothes-in-a-mall-store-and-customer-with-a-choice-in-a.mp4?s=mp4-640x640-is&k=20&c=mL6AMXe6iOfc9WX6gG15SsOmpq8dDzypMUQdcaIPIVA=" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="content-overlay">
        <div className="side-image left">
          <img src="https://i.pinimg.com/564x/2e/dc/09/2edc09023be9107d7663d9a88a72d783.jpg" alt="Left Side" />
        </div>
        <div className="text-content">
          <h2 style={{color:"black"}}>SHOP SPOT</h2>
          <p style={{fontSize:"25px"}}>
           Welcome to our thriving online marketplace
          </p>
          
        </div>
        <div className="side-image right">
          <img src="https://i.pinimg.com/564x/3a/62/80/3a6280bb4c8d8ea093d6606041b3f6ae.jpg" alt="Right Side" />
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
