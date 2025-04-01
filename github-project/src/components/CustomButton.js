import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomButton = ({ label, onClick, className }) => {
    return (
        <button
            onClick={onClick}
            className={className}
            >
            {label}
        </button>   
    );
};

export const ProfileButton = ({ username }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if(username) {
            navigate(`/profile/${username}`);
        } else {
            console.error("ProfileButton: Username not passed");
        }  
    };

    return <CustomButton label="View" onClick={handleClick} className="profile-btn" />;
};

export const GitHubButton = ({ url }) => {
    const handleClick = () => {
        if(url) {
            window.open(url, '_blank', "noopener noreferrer");
        } else {
            console.log("GitHubButton: GitHub URL missing")
        }
    };

    return <CustomButton label="GitHub" onClick={handleClick} className="github-btn" />;
};

export const LoginButton = () => {
    const navigate = useNavigate();
    return <CustomButton label="Log In" onClick={() => navigate('/login')} className="login-btn" />;
};

export const SignUpButton = () => {
    const navigate = useNavigate();
    return <CustomButton label="Sign Up" onClick={() => navigate('/signup')} className="signup-btn" />;
};
