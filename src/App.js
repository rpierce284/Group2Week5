import React, { useState, useEffect } from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import subscriptions from './components/Data';
import Cart from './components/Cart';
import About from './components/About';
import Movies from './components/Movies';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import CreditCard from './components/CreditCard';

const domain = "dev-ssangasx1yx1hgv4.us.auth0.com";
const clientId = "dOnLmOn1HMhw3kIa2iw3f05Tj1wNofv2";

const getCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : [];
};

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Protected route component
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please log in to access this page.</div>;

  return children;
}

function App() {
  const [cart, setCart] = useState(getCartFromLocalStorage());
  const { isAuthenticated, user, isLoading, error } = useAuth0();

  // Debugging logs to help troubleshoot the authentication status
  console.log("User authenticated:", isAuthenticated);
  console.log("User details:", user);
  console.log("Loading status:", isLoading);
  console.log("Auth0 error:", error);

  useEffect(() => {
    saveCartToLocalStorage(cart);
  }, [cart]);

  const addItemToCart = (subscription) => {
    if (cart.length > 0) {
      alert("You cannot add more than one subscription.");
      return;
    }
    setCart([...cart, { ...subscription, quantity: 1 }]);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: window.location.origin }} // Updated parameter
    >
      <Router>
        <div className="App">
          <nav className="navbar">
            <div className="navbar-logo">
              <img src="/logo.png" alt="Site Logo" className="site-logo" />
            </div>
            <ul className="navbar-links">
              <li><Link to="/"><strong>Home</strong></Link></li>
              <li><Link to="/movies"><strong>Movies</strong></Link></li>
              <li><Link to="/cart"><strong>Cart ({cart.length})</strong></Link></li>
              <li><Link to="/about"><strong>About</strong></Link></li>
            </ul>
            <div className="navbar-auth">
              <Profile />
              {/* Attempt to conditionally render based on isAuthenticated */}
              {isAuthenticated ? <LogoutButton /> : <LoginButton />}
            </div>
          </nav>

          <header className="App-header">
            <h1>Welcome to EZTech</h1>
            <p>Your favorite streaming service!</p>
          </header>

          <main className="main-content">
            <Routes>
              <Route path="/" element={
                <ProtectedRoute>
                  <div>
                    <h2>Available Subscriptions</h2>
                    <ul className="subscription-list">
                      {subscriptions.map((subscription) => (
                        <li key={subscription.id}>
                          <h3>{subscription.name}</h3>
                          <p>{subscription.description}</p>
                          <p>Price: ${subscription.price.toFixed(2)}</p>
                          <button onClick={() => addItemToCart(subscription)}>Add to Cart</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ProtectedRoute>
              } />

              <Route path="/movies" element={<ProtectedRoute><Movies cart={cart} setCart={setCart} /></ProtectedRoute>} />
              <Route path="/cart" element={<ProtectedRoute><Cart cart={cart} setCart={setCart} /></ProtectedRoute>} />
              <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
              <Route path="/checkout" element={<ProtectedRoute><CreditCard /></ProtectedRoute>} />
              <Route path="/login" element={<LoginButton />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Auth0Provider>
  );
}

export default App;
