import React, { use } from 'react';
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
        navigate(`/profile/${username}`);
    }

    return <CustomButton label="View" onClick={handleClick} className="profile-btn" />;
}

export const GitHubButton = ({ url }) => {
    const handleClick = () => {
        window.open(url, '_blank', "noopener noreferrer");
    };

    return <CustomButton label="GitHub" onClick={handleClick} className="github-btn" />;
};

export const LoginButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/Login`);
    };

    return <CustomButton label="Log In" onClick={handleClick} className="login-btn" />;
};

export const SignUpButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/Signup`);
    };
    
    return <CustomButton label="Sign Up" onClick={handleClick} className="signup-btn" />;
};
