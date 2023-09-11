import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import ArticleInFeed from './ArticleInFeed';
import ArticleType from '../types/article';
import './SelectedArticle.css';

function SelectedArticle({ articles }) {
  console.log(`Articles array in selected article component: ${articles}`);
  return (
    <div className="article-detail-component">
      <Outlet />
      <div className="article-detail-sidebar">
        {articles.map((article) => (
          <div>
            <ArticleInFeed
              key={article.articleId}
              publishedAt={article.publishedAt}
              articles={articles}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

SelectedArticle.propTypes = {
  articles: PropTypes.arrayOf(ArticleType).isRequired,
};

export default SelectedArticle;
