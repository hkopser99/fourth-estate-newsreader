import PropTypes from 'prop-types';
import {
  getDatabase, get, ref, set, increment, update,
} from 'firebase/database';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useCurrentUserContext } from '../contexts/CurrentUserContext';
import ArticleType from '../types/article';
import './ArticleDetail.css';

function ArticleDetail({ articles }) {
  const adjustDate = (dateString) => {
    const newDateString = dateString.substring(0, 10);
    const year = newDateString.slice(0, 4);
    const monthAndDate = newDateString.slice(5, 10);
    const finalizedString = `${monthAndDate}-${year}`;
    return finalizedString;
  };
  const { id } = useParams();
  const { currentUser } = useCurrentUserContext();

  console.log('Article Id with detail being displayed:', id);

  const articleToDisplay = articles.find((article) => article.publishedAt === id);

  useEffect(() => {
    if (articleToDisplay) {
      if (currentUser.uid) {
        console.log('Saving article read info now');
        const db = getDatabase();
        const articleDBReference = `/articles/${id}/`;
        console.log('article to display', articleToDisplay);
        console.log('Article DB Reference', articleDBReference);

        get(ref(db, articleDBReference)).then((snapshot) => {
          console.log(`snapshot of existing article ${snapshot}`);
          if (snapshot.exists()) {
            update(ref(db, articleDBReference), {
              readersCount: increment(1),
            }).then(() => {
              console.log('Updated existing story with new user and read count.');
            });
          } else {
            const randomNum = Math.floor(Math.random() * 100);
            const uniqueTime = Date.now();
            const uniqueId = randomNum * uniqueTime;

            set(ref(db, articleDBReference), {
              articleId: `${articleDBReference}`,
              uniqueId: `${uniqueId}`,
              title: `${articleToDisplay.title}` || '',
              author: `${articleToDisplay.author}` || '',
              source: `${articleToDisplay.source.name}` || '',
              description: `${articleToDisplay.description}`,
              datePosted: `${adjustDate(articleToDisplay.publishedAt)}` || '',
              url: `${articleToDisplay.url}` || '',
              urlToImage: `${articleToDisplay.urlToImage}` || '',
              readersCount: 1,
            }).then(() => {
              console.log('Saved article succesfully');
            }).catch((error) => {
              console.log('SAVE OF NEW ARTICLE FAILED!');
              console.error(error);
            });
          }
        });
      }
    }
  });

  const saveClickedThrough = () => {
    if (currentUser.uid) {
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
    }
    return true;
  };

  return (
    <div className="detail-item-component">
      {articleToDisplay ? (
        <>
          {articleToDisplay.urlToImage && <img src={articleToDisplay.urlToImage} alt="Article Pic" />}
          <h2>{articleToDisplay.title}</h2>
          {articleToDisplay.source.name === '' || <h3>{`From: ${articleToDisplay.source.name}`}</h3>}
          {articleToDisplay.author === '' || <h4>{`By: ${articleToDisplay.author}`}</h4>}
          <h5>{articleToDisplay.description}</h5>
          <p>{`Published: ${adjustDate(articleToDisplay.publishedAt)}`}</p>
          <a href={articleToDisplay.url} target="_blank" rel="noopener noreferrer" onClick={((event) => saveClickedThrough(event))}>Read Full Article</a>
        </>
      ) : <h2>Article not found</h2>}
    </div>
  );
}

ArticleDetail.propTypes = {
  articles: PropTypes.arrayOf(ArticleType).isRequired,
};

export default ArticleDetail;
