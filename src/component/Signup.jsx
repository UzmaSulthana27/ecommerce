import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Signup = () => {
  const [signup, setSignup] = useState({
    username: '',
    password: '',
    email: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    if (!signup.username || !signup.password || !signup.email) {
      return 'Please fill all fields.';
    }
    if (signup.username.length < 3) {
      return 'Username must be at least 3 characters.';
    }
    if (!/\S+@\S+\.\S+/.test(signup.email)) {
      return 'Enter a valid email address.';
    }
    if (signup.password.length < 6) {
      return 'Password must be at least 6 characters.';
    }
    if (!/\d/.test(signup.password)) {
      return 'Password must contain at least one number.';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignup({ ...signup, [name]: value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    alert('Signup Successful!');
    navigate('/Login');
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          background: `
            linear-gradient(120deg, #e3e8ff 60%, #f5f5f5 100%)
          `,
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            background: '#fff',
            padding: '2.5rem 2.5rem',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem',
            minWidth: '340px',
            animation: 'fadeIn 0.8s ease',
            transition: 'box-shadow 0.3s'
          }}
        >
          <h2 style={{
            textAlign: 'center',
            marginBottom: '0.5rem',
            color: '#007bff',
            fontWeight: 'bold',
            letterSpacing: '1px',
            fontSize: '2rem',
            animation: 'slideDown 0.7s'
          }}>Signup</h2>
          <label style={{ fontWeight: 'bold', color: '#333', fontSize: '1.05rem' }}>Username:</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            style={{
              padding: '0.7rem',
              border: '1.5px solid #dbeafe',
              borderRadius: '6px',
              fontSize: '1rem',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              outline: 'none',
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
            }}
            onFocus={e => e.target.style.borderColor = '#007bff'}
            onBlur={e => e.target.style.borderColor = '#dbeafe'}
          />
          <label style={{ fontWeight: 'bold', color: '#333', fontSize: '1.05rem' }}>Email:</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            style={{
              padding: '0.7rem',
              border: '1.5px solid #dbeafe',
              borderRadius: '6px',
              fontSize: '1rem',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              outline: 'none',
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
            }}
            onFocus={e => e.target.style.borderColor = '#007bff'}
            onBlur={e => e.target.style.borderColor = '#dbeafe'}
          />
          <label style={{ fontWeight: 'bold', color: '#333', fontSize: '1.05rem' }}>Password:</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            style={{
              padding: '0.7rem',
              border: '1.5px solid #dbeafe',
              borderRadius: '6px',
              fontSize: '1rem',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              outline: 'none',
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
            }}
            onFocus={e => e.target.style.borderColor = '#007bff'}
            onBlur={e => e.target.style.borderColor = '#dbeafe'}
          />
          {error && (
            <div style={{
              color: '#d90429',
              marginBottom: '0.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
              transition: 'opacity 0.3s'
            }}>{error}</div>
          )}
          <input
            type="submit"
            value="Signup"
            style={{
              background: 'linear-gradient(90deg, #007bff 60%, #0056b3 100%)',
              color: '#fff',
              border: 'none',
              padding: '0.9rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1.08rem',
              marginTop: '0.5rem',
              boxShadow: '0 2px 8px rgba(0,123,255,0.08)',
              transition: 'background 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={e => {
              e.target.style.background = 'linear-gradient(90deg, #0056b3 60%, #007bff 100%)';
              e.target.style.boxShadow = '0 4px 16px rgba(0,123,255,0.18)';
            }}
            onMouseLeave={e => {
              e.target.style.background = 'linear-gradient(90deg, #007bff 60%, #0056b3 100%)';
              e.target.style.boxShadow = '0 2px 8px rgba(0,123,255,0.08)';
            }}
          />
          <div style={{
            textAlign: 'center',
            marginTop: '1rem',
            fontSize: '1rem'
          }}>
            <span style={{ color: '#555' }}>Already have an account?</span>
            <button
              type="button"
              onClick={() => navigate('/Login')}
              style={{
                marginLeft: '0.7rem',
                background: 'linear-gradient(90deg, #28a745 60%, #218838 100%)',
                color: '#fff',
                border: 'none',
                padding: '0.6rem 1.2rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1rem',
                boxShadow: '0 2px 8px rgba(40,167,69,0.08)',
                transition: 'background 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={e => {
                e.target.style.background = 'linear-gradient(90deg, #218838 60%, #28a745 100%)';
                e.target.style.boxShadow = '0 4px 16px rgba(40,167,69,0.18)';
              }}
              onMouseLeave={e => {
                e.target.style.background = 'linear-gradient(90deg, #28a745 60%, #218838 100%)';
                e.target.style.boxShadow = '0 2px 8px rgba(40,167,69,0.08)';
              }}
            >
              Login
            </button>
          </div>
          {/* Animation keyframes */}
          <style>
            {`
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(30px);}
                to { opacity: 1; transform: translateY(0);}
              }
              @keyframes slideDown {
                from { opacity: 0; transform: translateY(-30px);}
                to { opacity: 1; transform: translateY(0);}
              }
            `}
          </style>
        </form>
      </div>
    </>
  );
};

export default Signup;