import PropTypes from 'prop-types';

const ArticleType = PropTypes.shape({
  source: PropTypes.objectOf(PropTypes.strings),
  author: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  urlToImage: PropTypes.string,
  publishedAt: PropTypes.string,
  content: PropTypes.string,
  articleId: PropTypes.string,
  key: PropTypes.string.isRequired,
});

export default ArticleType;
