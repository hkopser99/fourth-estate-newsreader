import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ArticleType from '../types/article';
import './ArticleInFeed.css';

function ArticleInFeed({ articles, publishedAt }) {
  const cleanUpDateString = (dateString) => {
    const newDateString = dateString.substring(0, 10);
    const year = newDateString.slice(0, 4);
    const monthAndDate = newDateString.slice(5, 10);
    const finalizedString = `${monthAndDate}-${year}`;
    return finalizedString;
  };

  const articleToDisplay = articles.find((article) => article.publishedAt === publishedAt);
  console.log('Article to display:', articleToDisplay);
  if (articleToDisplay) {
    return (
      <div className="article-in-feed-component">
        {articleToDisplay.urlToImage && <img src={articleToDisplay.urlToImage} alt="Article Pic" />}
        <Link to={`/news/${publishedAt}`}>
          {(articleToDisplay.description && <h3>{articleToDisplay.description}</h3>)
          || (articleToDisplay.title && <h3>{articleToDisplay.title}</h3>)}
        </Link>
        {articleToDisplay.source.name === '' || <h4>{`From: ${articleToDisplay.source.name}`}</h4>}
        {articleToDisplay.author && <h5>{`By: ${articleToDisplay.author}`}</h5>}
        {articleToDisplay.publishedAt && <p>{`Published: ${cleanUpDateString(articleToDisplay.publishedAt)}`}</p>}
      </div>
    );
  }
}

ArticleInFeed.propTypes = {
  articles: PropTypes.arrayOf(ArticleType).isRequired,
  publishedAt: PropTypes.string.isRequired,
};

export default ArticleInFeed;
