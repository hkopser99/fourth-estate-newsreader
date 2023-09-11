import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TopArtcleType from '../types/topArticle';
import './TopArticleInFeed.css';

function TopArticleInFeed({ topArticlesArray, uniqueId }) {
  const articleToDisplay = topArticlesArray.find((article) => article.uniqueId === uniqueId);
  console.log('array passed to each top article');
  console.log('Top Article to display:', articleToDisplay);
  console.log('Top article to display ID', articleToDisplay.articleId);
  return (
    <div>
      { articleToDisplay
        ? (
          <div className="article-in-feed-component">
            {articleToDisplay.urlToImage === 'null' || <img src={articleToDisplay.urlToImage} alt="" />}
            <Link to={`/topfeed/${articleToDisplay.uniqueId}`}>
              {articleToDisplay.title && <h3>{articleToDisplay.title}</h3>}
            </Link>
            {articleToDisplay.source && <h4>{`From: ${articleToDisplay.source}`}</h4>}
            {articleToDisplay.datePosted && <h6>{`Published: ${articleToDisplay.datePosted}`}</h6>}
            <hr />
          </div>
        )
        : <p>No top stories to view, go read something new!</p>}
    </div>
  );
}

TopArticleInFeed.propTypes = {
  topArticlesArray: PropTypes.arrayOf(TopArtcleType).isRequired,
  uniqueId: PropTypes.string.isRequired,
};

export default TopArticleInFeed;
