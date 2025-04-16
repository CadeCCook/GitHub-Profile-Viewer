import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import styles from './Header.module.css';

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
      <div className={styles.leftSection}>
        <div className={styles.logo}>GitHunt</div>
        <button className={styles.homeBtn} onClick={handleToggle}>
          {location.pathname === '/' ? 'Users' : 'Home'}
        </button>

        {isAuthenticated && username && (
          <button className={styles.userBtn} onClick={() => navigate(`/profile/${username}`)}>
            {username}'s Profile
          </button>
        )}
      </div>

      <div className={styles.authButtons}>
        {!isAuthenticated ? (
          <>
            <button onClick={() => navigate('/signup')}>Sign Up</button>
            <button onClick={() => navigate('/login')}>Log In</button>
          </>
        ) : (
          <button className={styles.logoutBtn} onClick={handleLogout}>Log Out</button>
        )}
      </div>
    </header>
  );
};

export default Header;