import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Login() {
    return (
        <div className='login-container'>
            <Header />
            <h2>Login</h2>
            <form action="/login" method="POST">
                <label htmlFor="username">Display Name or Email</label>
                <input type="text" id="username" name="username" required placeholder="Enter your input..." />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required placeholder="Enter your password..." />
                <div className='checkbox-container'>
                    <input type='checkbox' id='check' name='check' required></input>
                    <label for='check'>I am not a robot</label>
                </div>
                <button type="submit">Login</button>
                <p className='account-redirect'>Don't have an account? <a href="signup">Sign up</a></p>
            </form>
            <Footer />
        </div>
    );
}

export default Login;
