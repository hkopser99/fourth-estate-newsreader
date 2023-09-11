import PropTypes from 'prop-types';
import { Outlet, Link } from 'react-router-dom';
import { useCurrentUserContext } from '../contexts/CurrentUserContext';
import TopArticleInFeed from './TopArticleInFeed';
import TopArtcleType from '../types/topArticle';
import './SelectedTopArticle.css';

function SelectedTopArticle({ topArticlesArray }) {
  const { currentUser } = useCurrentUserContext();
  console.log(`Articles array in selected top article component: ${topArticlesArray}`);
  return (
    <div>
      { currentUser.uid ? (
        <div className="article-detail-component">
          <Outlet />
          <div className="article-detail-sidebar">
            {topArticlesArray.map((article) => (
              <div>
                <TopArticleInFeed
                  key={article.articleId}
                  uniqueId={article.uniqueId}
                  topArticlesArray={topArticlesArray}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Link to="/login">Login to View</Link>
      )}
    </div>
  );
}

SelectedTopArticle.propTypes = {
  topArticlesArray: PropTypes.arrayOf(TopArtcleType).isRequired,
};

export default SelectedTopArticle;
