import { Link } from 'react-router-dom';
import NewsOptions from './NewsOptions';
import UserDetails from './UserDetails';
import { useCurrentUserContext } from '../contexts/CurrentUserContext';
import './Header.css';

function Header() {
  const { currentUser } = useCurrentUserContext();

  return (
    <div className="header-component">
      <Link to="/">
        <h1>Fourth Estate</h1>
      </Link>
      <div className="menu">
        { currentUser.uid ? (
          <Link to="/mostread">
            <button className="custom-header-item" type="button">Top Articles</button>
          </Link>
        ) : null}
        <NewsOptions className="custom-header-item" />
        { currentUser.uid ? (
          <Link to={`/profile/${currentUser.email}`}>
            <button className="custom-header-item" type="button">Profile</button>
          </Link>
        ) : null}
        <UserDetails className="custom-header-item" />
      </div>
    </div>
  );
}

export default Header;
