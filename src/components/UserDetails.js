import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useContext } from 'react';
// {/*Add Profile SVG */}
import { useCurrentUserContext } from '../contexts/CurrentUserContext';
import CurrentNewsFeedContext from '../contexts/PreferredFeedContext';
import './UserDetails.css';

function UserDetails() {
  const { currentUser, setCurrentUser } = useCurrentUserContext();
  const { setCurrentNewsFeed } = useContext(CurrentNewsFeedContext);
  const navigate = useNavigate();

  const logout = async () => {
    const auth = getAuth();
    await signOut(auth).then(() => {
      setCurrentUser({});
      setCurrentNewsFeed({});
      navigate('/');
      console.log('User signed out successfully');
    }).catch((error) => {
      console.error('Sign out error:', error);
    });
  };

  return (
    <div>
      { currentUser.email
        ? (
          <div>
            <button className="user-details-component" type="button" onClick={logout}>
              {`Log out ${currentUser.email}`}
            </button>
          </div>
        ) : (
          <div className="user-details-component">
            <Link to="/login">Login</Link>
          </div>
        )}
    </div>
  );
}

export default UserDetails;
