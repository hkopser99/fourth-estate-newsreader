import PropTypes from 'prop-types';
import {
  getDatabase, ref, get, update, increment,
} from 'firebase/database';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useCurrentUserContext } from '../contexts/CurrentUserContext';
import TopArtcleType from '../types/topArticle';
import './TopArticleDetail.css';

function TopArticleDetail({ topArticlesArray }) {
  const { uniqueid } = useParams();
  const { currentUser } = useCurrentUserContext();

  console.log('current user id on most read page', currentUser.uid);
  console.log('Selected top article uniqueID:', uniqueid);

  const articleToDisplay = topArticlesArray.find((article) => article.uniqueId === uniqueid);

  useEffect(() => {
    if (articleToDisplay) {
      if (currentUser.uid) {
        console.log('Incrementing top article readsCount');
        const db = getDatabase();
        const articleDBReference = `${articleToDisplay.articleId}`;
        console.log('Top Article DB Reference', articleDBReference);

        get(ref(db, articleDBReference)).then((snapshot) => {
          console.log(`snapshot of existing top article ${snapshot}`);
          if (snapshot.exists()) {
            update(ref(db, articleDBReference), {
              readersCount: increment(1),
            }).then(() => {
              console.log('Incremented existing top article read count by 1.');
            });
          }
        });
      }
    }
  });

  const saveClickedThrough = () => {
    console.log('Saving top article read through count now');
    const db = getDatabase();
    const articleDBReference = `${articleToDisplay.articleId}`;
    console.log('DB Reference for save read through of top article', articleDBReference);

    get(ref(db, articleDBReference)).then((snapshot) => {
      console.log(`snapshot of existing article ${snapshot}`);
      if (snapshot.exists()) {
        update(ref(db, articleDBReference), {
          readThroughCount: increment(1),
        }).then(() => {
          console.log('Incremented existing top article click through count.');
        });
      }
    });
    return true;
  };

  return (
    <div className="detail-item-component">
      {articleToDisplay && currentUser.uid ? (
        <>
          {articleToDisplay.urlToImage === 'null' || <img src={articleToDisplay.urlToImage} alt="Article Pic" />}
          <h2>{articleToDisplay.title}</h2>
          {articleToDisplay.author === 'null' || <h3>{`By: ${articleToDisplay.author}`}</h3>}
          {articleToDisplay.description === 'null' || <h5>{articleToDisplay.description}</h5>}
          <p>{articleToDisplay.datePosted}</p>
          <a href={articleToDisplay.url} target="_blank" rel="noopener noreferrer" onClick={((event) => saveClickedThrough(event))}>Read Full Article</a>
        </>
      ) : <h2>Article not found</h2>}
    </div>
  );
}

TopArticleDetail.propTypes = {
  topArticlesArray: PropTypes.arrayOf(TopArtcleType).isRequired,
};

export default TopArticleDetail;
