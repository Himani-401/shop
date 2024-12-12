import React from 'react';
import './Home_About.css'; 

const Home_About = () => {
  return (
    <section className="about">
      <h2>About</h2>
      <p className="philosophy">
        Our Shopping Philosophy
      </p>
      <p>
        At Shop Spot, we curate a diverse range of products from top brands to cater to your every need. Our mission is to provide a seamless shopping experience, ensuring quality and satisfaction with every purchase.
      </p>
      <button className="learn-more">Learn More</button>
    </section>
  );
};

export default Home_About;