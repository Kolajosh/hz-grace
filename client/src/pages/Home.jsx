import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";

const Home = () => {
    return (
      <div>
        <Navbar />
        <Slider />
        <Products/>
        <Hero/>
        <Categories/>
        <Newsletter/>
        <Footer/>
      </div>
    );
  };
  
  export default Home;