import PropTypes from 'prop-types';
import { useState } from 'react';
import { getDatabase, ref, set } from 'firebase/database';
import { useNavigate, Link } from 'react-router-dom';
import { useCurrentUserContext } from '../contexts/CurrentUserContext';
import { useCurrentNewsFeedContext } from '../contexts/PreferredFeedContext';
import Alert from './Alert';
import NewsOptionType from '../types/newsOptions';
import NewsOptionsListRow from './NewsOptionsListRow';
import './NewsOptionsList.css';

function NewsOptionsList({ newsOptions }) {
  const { currentUser } = useCurrentUserContext();
  const { setCurrentNewsFeed } = useCurrentNewsFeedContext();
  const [saving, setSaving] = useState(false);
  const [saveErrorMessage, setSaveErrorMessage] = useState('');
  const navigate = useNavigate();

  const setNewsOption = (newsOptionSelected) => {
    setSaving(true);
    setSaveErrorMessage('');
    console.log('Saving news option info now');
    console.log('News option selected:', newsOptionSelected);
    const db = getDatabase();
    const userDBReference = `users/${currentUser.uid}/newsOption`;
    set(ref(db, userDBReference), {
      newsOptionId: `${newsOptionSelected.optionId}`,
      newsOptionName: `${newsOptionSelected.optionName}`,
      newsOptionAPIString: `${newsOptionSelected.optionAPIString}`,
    }).then(() => {
      setSaving(false);
      setCurrentNewsFeed(newsOptionSelected.optionAPIString);
      navigate('/');
    }).catch((error) => {
      console.error('Saving failed. Reason:', error);
      setSaving(false);
      setSaveErrorMessage(error);
    });
  };

  return (
    <div>
      {currentUser.uid ? (
        <div className="news-options-list-component">
          <Alert visible={saveErrorMessage}>
            <p>Error saving change:</p>
            <p>{`Error Details:${saveErrorMessage}`}</p>
            <p>Check your internet and try again</p>
          </Alert>
          <Alert visible={saving}>
            <p>Saving your selection, just a moment!</p>
          </Alert>
          {newsOptions.map((newsOption) => (
            <button type="button" onClick={() => setNewsOption(newsOption)}>
              {console.log('Mapping:', newsOption)}
              <NewsOptionsListRow
                key={newsOption.optionId}
                newsOptionsList={newsOptions}
                optionId={newsOption.optionId}
              />
            </button>
          ))}
        </div>
      ) : <Link to="login">Login or Sign Up to View</Link>}
    </div>
  );
}

NewsOptionsList.propTypes = {
  newsOptions: PropTypes.arrayOf(NewsOptionType).isRequired,
};

export default NewsOptionsList;
