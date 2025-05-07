import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch.js';
import './home.css';  // Import custom CSS

const HomePage = () => {
  const { data: featuredDishes, loading, error } = useFetch('http://localhost:8800/api/fooditems/featured');

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          {/* Left side: Text */}
          <div className="hero-text">
            <h1>Experience Authentic Vietnamese Cuisine</h1>
            <p>
              Explore the rich flavors, traditions, and culture of Vietnamese food. 
              From Phở to Bánh Mì, discover the vibrant culinary heritage!
            </p>
            <div className="hero-buttons">
              <Link to="/foodItems" className="btn-custom">Explore Menu</Link>
              <Link to="/about" className="btn-outline-custom">Learn More</Link>
            </div>
          </div>

          {/* Right side: Image */}
          <div className="hero-image-wrapper">
            <img
              src="https://www.celebritycruises.com/blog/content/uploads/2022/04/best-food-in-vietnam-hero.jpg"
              alt="Vietnamese cuisine collage"
              className="hero-image"
            />
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="featured-dishes">
        <div className="container">
          <h2>Specialties</h2>

          {loading ? (
            <div className="text-center text-xl">Loading...</div>
          ) : error ? (
            <div className="text-center text-xl text-red-600">Error: {error}</div>
          ) : (
            <div className="grid-container">
              {featuredDishes.map(dish => (
                <div className="card" key={dish._id}>
                  <img
                    src={dish.imageUrl}
                    alt={dish.name}
                    className="card-image"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{dish.name}</h5>
                    <p className="card-text">{dish.description}</p>
                    <p className="card-price">${dish.price}</p>
                    <Link to={`/foodItems/${dish._id}`} className="btn-custom">View Details</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
