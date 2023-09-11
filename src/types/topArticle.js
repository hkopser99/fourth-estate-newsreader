import PropTypes from 'prop-types';

const TopArtcleType = PropTypes.shape({
  source: PropTypes.string,
  author: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  urlToImage: PropTypes.string,
  publishedAt: PropTypes.string,
  content: PropTypes.string,
  articleId: PropTypes.string.isRequired,
  uniqueId: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
});

export default TopArtcleType;
