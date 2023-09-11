import { useNavigate } from 'react-router-dom';
import { useCurrentUserContext } from '../contexts/CurrentUserContext';
import './NewsOptions.css';

function NewsOptions() {
  const { currentUser } = useCurrentUserContext();
  const navigate = useNavigate();

  const viewNewsOptions = () => {
    navigate('/newsoptions');
  };
  return (
    <div>
      { currentUser.uid ? (
        <button className="news-options-component" type="button" onClick={viewNewsOptions}>
          News Options
        </button>
      ) : null}
    </div>
  );
}

export default NewsOptions;
