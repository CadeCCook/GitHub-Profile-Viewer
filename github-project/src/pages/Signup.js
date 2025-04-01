import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Signup() {
    return (
        <div className='signup-container'>
            <Header />
            <h2>Sign Up</h2>
            <form action="/signup" method="POST">
                <label htmlFor="username">Display Name</label>
                <input type="text" id="username" name="username" required placeholder="Enter your username..." />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required placeholder="Create a password..." />
                <label htmlFor="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" name="confirm-password" required placeholder="Confirm your password..." />
                <label htmlFor="email">Email (optional)</label>
                <input type="email" id="email" name="email" placeholder="Enter your email..." />
                <button type="submit">Sign Up</button>
                <p className='account-redirect'>Already have an account? <a href="login">Login</a></p>
            </form>
            <Footer />
        </div>
    );
}

export default Signup;
