import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found-component">
      <h2>Page not found, maybe a typo is to blame?</h2>
      <Link to="/">Return Home</Link>
    </div>
  );
}

export default NotFound;
