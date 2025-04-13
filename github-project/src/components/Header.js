import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authState, logout } = useAuth();
  const { isAuthenticated, username } = authState;

  const handleLogout = () => {
    logout();
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
        <button className="home-btn" onClick={handleToggle}>
          {location.pathname === '/' ? 'Users' : 'Home'}
        </button>

        {isAuthenticated && username && (
          <button className="user-btn" onClick={() => navigate(`/profile/${username}`)}>
            {username}'s Profile
          </button>
        )}
      </div>

      <div className="auth-buttons">
        {!isAuthenticated ? (
          <>
            <button onClick={() => navigate('/signup')}>Sign Up</button>
            <button onClick={() => navigate('/login')}>Log In</button>
          </>
        ) : (
          <button className="logout-btn" onClick={handleLogout}>Log Out</button>
        )}
      </div>
    </header>
  );
};

export default Header;