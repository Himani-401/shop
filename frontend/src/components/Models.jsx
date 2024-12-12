
import React from 'react';
import './Models.css'; 

const Models = () => {
  return (
    <div className="section3">
      <div className="text-content">
        <h2>Models You Might Love</h2>
        <p>Explore our featured models that combine style and functionality. Each model is selected for its unique design and excellent performance.</p>
      </div>
      <div className="cards-content">
        <div className="model-card">
          <img src="https://i.pinimg.com/564x/80/29/8f/80298ff1e620ecb19602be706f1f880c.jpg" alt="Model 1" />
          <div className="model-info">
            <h3>Model 1</h3>
            
            <button>View Details</button>
          </div>
        </div>
        <div className="model-card">
          <img src="https://i.pinimg.com/564x/12/0e/21/120e216d58caea14abddcaeb20c598c0.jpg" alt="Model 2" />
          <div className="model-info">
            <h3>Model 2</h3>
            <p>Description of Model 2</p>
            <button>View Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Models;
