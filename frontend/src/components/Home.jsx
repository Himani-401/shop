import React from 'react';
import Navbar from './Navbar';
import Upper from './Upper';
import ContentSection from './ContentSection';
import Products from './Products';
import Models from './Models';
import Home_About from './Home_about';

function Home({ user }) {
  return (
    <div>
      
 <div>
     
         <Upper/>
    <ContentSection/>
    <Products/>
    <Models/>
    <Home_About/>
        </div>
    </div>
  );
}

export default Home;
