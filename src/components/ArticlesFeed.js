import PropTypes from 'prop-types';
import ArticleType from '../types/article';
import ArticleInFeed from './ArticleInFeed';
import './ArticlesFeed.css';

function ArticlesFeed({ articles }) {
  return (
    <div className="article-details.component">
      {articles.map((article) => (
        <ArticleInFeed
          key={article.articleId}
          publishedAt={article.publishedAt}
          articles={articles}
        />
      ))}
    </div>
  );
}

ArticlesFeed.propTypes = {
  articles: PropTypes.arrayOf(ArticleType).isRequired,
};

export default ArticlesFeed;
