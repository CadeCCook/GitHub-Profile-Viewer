import react, {useEffect, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check for token in local storage
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
          setIsAuthenticated(true);
        }
      }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        navigate('/');
    };

    const handleToggle = () => {
        if (location.pathname === '/') {
            navigate('/users');
        } else {
            navigate('/');
        }
    };

    return (
        <header>
            <div className="left-section">
                <div className="logo">GitHunt</div>

                {/* Toggle Home/User Button */}
                <button className="home-btn" onClick= {handleToggle}>
                    {location.pathname === '/' ? 'Users' : 'Home'}
                </button>

                {isAuthenticated && <button className="user-btn" onClick={handleLogout}>Log Out</button>}
            </div>

            <div className="auth-buttons">
                {!isAuthenticated ? (
                <>
                    <button className="signup-btn">Sign Up</button>
                    <button className="login-btn">Log In</button>
                </>
                ) : (
                    <button className="logout-btn" onClick={handleLogout}>Log Out</button>
                )}
            </div>
        </header>
    );
};

export default Header;