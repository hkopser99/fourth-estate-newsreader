import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TopArticleInFeed from './TopArticleInFeed';
import TopArtcleType from '../types/topArticle';
import { useCurrentUserContext } from '../contexts/CurrentUserContext';
import './TopArticlesFeed.css';

function TopArticlesFeed({ topArticlesArray }) {
  const { currentUser } = useCurrentUserContext();
  console.log('Array passed to top articles feed', topArticlesArray);
  return (
    <div>
      { currentUser.uid ? (
        <div className="articles-component">
          <div>
            <Link to="/">
              <h2>Back home</h2>
            </Link>
            {topArticlesArray.map((article) => (
              <TopArticleInFeed
                key={article.uniqueId}
                uniqueId={article.uniqueId}
                topArticlesArray={topArticlesArray}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="articles-component-login">
          <Link to="/login">
            Login to View
          </Link>
        </div>
      )}
    </div>
  );
}

TopArticlesFeed.propTypes = {
  topArticlesArray: PropTypes.arrayOf(TopArtcleType).isRequired,
};

export default TopArticlesFeed;
