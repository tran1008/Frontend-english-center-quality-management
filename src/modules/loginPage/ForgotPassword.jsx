import { Container, Form, Alert } from 'react-bootstrap';
import Logo from '../../assets/images/global/LogoLogin.svg';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
        if (successMessage) {
          navigate('/login'); 
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/v1/email', { email });
      setSuccessMessage(response.data.message);
      setErrorMessage('');
    } 
    catch (error) {
      setErrorMessage(error.response.data.message);
      setSuccessMessage('');
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ marginTop: '60px' }}>
      <img src={Logo} alt="Logo image" fluid style={{ marginTop: '40px', marginBottom: '20px' }} />
      <h2>Sign in to your Email</h2>
      <span>Don't worry, give us your email. We will retrieve the password!</span> <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail" style={{ width: '400px' }}>
          <Form.Control
            type="text"
            placeholder="Email"
            style={{ borderRadius: '6px', marginBottom: '10px' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <button
          type="submit"
          style={{
            backgroundColor: '#2877fd',
            width: '100%',
            marginTop: '7px',
            padding: '10px 10px',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '8px',
          }}
        >
          Send
        </button>
        <a style={{ textDecoration: 'none', cursor: 'pointer', color: '#2877fd' }} onClick={() => { navigate(`/login`); }}>
          Back to Login
        </a>
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      </Form>
    </Container>
  );
}

export default ForgotPassword;
