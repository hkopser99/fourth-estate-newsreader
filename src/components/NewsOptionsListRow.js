import PropTypes from 'prop-types';
import NewsOptionType from '../types/newsOptions';
import './NewsOptionsListRow.css';

function NewsOptionsListRow({ newsOptionsList, optionId }) {
  const newsOption = newsOptionsList.find((option) => option.optionId === optionId);

  return (
    // Here check if this matches user's optiong and if so put mark next to it]
    <div className="news-option-list-row-component">
      <h3>{newsOption.optionName}</h3>
      <h4>{newsOption.optionDescription}</h4>
    </div>
  );
}

NewsOptionsListRow.propTypes = {
  newsOptionsList: PropTypes.arrayOf(NewsOptionType).isRequired,
  optionId: PropTypes.string.isRequired,
};

export default NewsOptionsListRow;
