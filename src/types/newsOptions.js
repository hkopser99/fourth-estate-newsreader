import PropTypes from 'prop-types';

const NewsOptionType = [{
  optionId: PropTypes.string.isRequired,
  optionName: PropTypes.string.isRequired,
  optionDescription: PropTypes.string.isRequired,
  optionAPIString: PropTypes.string.isRequired,
}];

export default NewsOptionType;
