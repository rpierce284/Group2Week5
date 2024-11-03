import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; 
import './Movies.css'; 

const Movies = ({ cart, setCart }) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=61857dda9750c8d2c9336724a7eacb2e`
        );
        const moviesWithUUID = response.data.results.map(movie => ({
          ...movie,
          uuid: uuidv4()
        }));
        setPopularMovies(moviesWithUUID);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    const fetchTopRatedMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=61857dda9750c8d2c9336724a7eacb2e`
        );
        const moviesWithUUID = response.data.results.map(movie => ({
          ...movie,
          uuid: uuidv4()
        }));
        setTopRatedMovies(moviesWithUUID);
      } catch (error) {
        console.error('Error fetching top-rated movies:', error);
      }
    };

    fetchPopularMovies();
    fetchTopRatedMovies();
  }, []);

  const handleAddToCart = (movie, price) => {
    // Ensure the movie object has a `name` key that corresponds to the title
    const newCartItem = { 
      id: movie.uuid, 
      name: movie.title,  // Set `name` as the movie's title
      price, 
      quantity: 1
    };
    setCart([...cart, newCartItem]);
    alert(`${movie.title} added to cart for $${price}`);
  };

  return (
    <div className="movies-container">
      <h1>Popular Movies</h1>
      <ul className="movies-list">
        {popularMovies.map(movie => (
          <li key={movie.uuid} className="movie-item">
            <h2>{movie.title}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <p>$5.99</p>
            <button
              className="add-to-cart-button"
              onClick={() => handleAddToCart(movie, 5.99)}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>

      <h1>Top Rated Movies</h1>
      <ul className="movies-list">
        {topRatedMovies.map(movie => (
          <li key={movie.uuid} className="movie-item">
            <h2>{movie.title}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <p>$3.99</p>
            <button
              className="add-to-cart-button"
              onClick={() => handleAddToCart(movie, 3.99)}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
