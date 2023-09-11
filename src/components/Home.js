import PropTypes from 'prop-types';
import ArticleType from '../types/article';
import ArticlesFeed from './ArticlesFeed';
import './Home.css';

function Home({ articles }) {
  return (
    <div className="home-component">
      <ArticlesFeed articles={articles} />
    </div>
  );
}

Home.propTypes = {
  articles: PropTypes.arrayOf(ArticleType).isRequired,
};

export default Home;
