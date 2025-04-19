import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';
import styles from './Auth.module.css';

function Signup() {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return setMessage("Passwords do not match.");
    }

    try {
      const res = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Signup failed.");
      } else {
        const { token } = data;
        login(token, form.username);
        setMessage("Signup successful!");
        navigate(`/profile/${form.username}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("An error occurred during signup.");
    }
  };

  return (
    <div className={styles.signupContainer}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">GitHub Username<span className={styles.requiredStar}> *</span></label>
        <input type="text" id="username" name="username" required value={form.username} onChange={handleChange} placeholder="Enter your username..." />

        <label htmlFor="password">Password<span className={styles.requiredStar}> *</span></label>
        <input type="password" id="password" name="password" required value={form.password} onChange={handleChange} placeholder="Create a password..." />

        <label htmlFor="confirmPassword">Confirm Password<span className={styles.requiredStar}> *</span></label>
        <input type="password" id="confirm-password" name="confirmPassword" required value={form.confirmPassword} onChange={handleChange} placeholder="Confirm your password..." />

        <label htmlFor="email">Email *</label>
        <input type="email" id="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email..." />

        <button type="submit">Sign Up</button>
        <p className={styles.accountRedirect}>Already have an account? <a href="/login">Login</a></p>
        {message && <p className={styles.formMessage}>{message}</p>}
      </form>
    </div>
  );
}

export default Signup;
