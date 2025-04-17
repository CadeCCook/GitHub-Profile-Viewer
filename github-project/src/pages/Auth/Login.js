import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';
import styles from './Auth.module.css';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Login failed.");
      } else {
        const { token, username } = data;
        localStorage.setItem("authToken", token);
        login(token, username);
        setMessage("Login successful!");
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      setMessage("An error occurred during login.");
    }
  };

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" required value={form.email} onChange={handleChange} placeholder="Enter your email..." />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required value={form.password} onChange={handleChange} placeholder="Enter your password..." />

        <div className='checkbox-container'>
          <input type='checkbox' id='check' name='check' required />
          <label htmlFor='check'>I am not a robot</label>
        </div>

        <button type="submit">Login</button>
        <p className={styles.accountRedirect}>Don't have an account? <a href="/signup">Sign up</a></p>
        {message && <p className='form-message'>{message}</p>}
      </form>
    </div>
  );
}

export default Login;
