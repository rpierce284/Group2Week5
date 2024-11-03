import React, { useState } from 'react';
import './CreditCard.css'; // Import CSS for styling

const CreditCard = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // Format card number as 1234 5678 9012 3456
  const formatCardNumber = (value) => {
    return value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleExpiryDateChange = (e) => {
    // Allow MM/YY format
    const formatted = e.target.value.replace(/[^0-9/]/g, '').slice(0, 5);
    if (formatted.length === 2 && expiryDate.length === 1) {
      setExpiryDate(formatted + '/');
    } else {
      setExpiryDate(formatted);
    }
  };

  const handleCvvChange = (e) => {
    const formatted = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCvv(formatted);
  };

  const handleSaveCard = () => {
    if (cardNumber.length === 19 && expiryDate.length === 5 && cvv.length === 3) {
      localStorage.setItem('creditCard', JSON.stringify({ cardNumber, expiryDate, cvv }));
      alert('Credit card information saved successfully!');
    } else {
      alert('Please enter valid credit card details.');
    }
  };

  return (
    <div className="credit-card-form">
      <h2>Enter Your Credit Card Information</h2>
      <div className="form-group">
        <label>Card Number</label>
        <input
          type="text"
          value={cardNumber}
          onChange={handleCardNumberChange}
          placeholder="1234 5678 9012 3456"
          maxLength="19"
        />
      </div>
      <div className="form-group">
        <label>Expiration Date</label>
        <input
          type="text"
          value={expiryDate}
          onChange={handleExpiryDateChange}
          placeholder="MM/YY"
          maxLength="5"
        />
      </div>
      <div className="form-group">
        <label>CVV</label>
        <input
          type="text"
          value={cvv}
          onChange={handleCvvChange}
          placeholder="123"
          maxLength="3"
        />
      </div>
      <button className="save-button" onClick={handleSaveCard}>Save Card</button>
    </div>
  );
};

export default CreditCard;
