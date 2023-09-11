import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  getDatabase, ref, child, get,
} from 'firebase/database';
import { useMemo, useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import ArticleDetail from './components/ArticleDetail';
import SelectedArticle from './components/SelectedArticle';
import NotFound from './components/NotFound';
import NewsOptionsList from './components/NewsOptionsList';
import CurrentUserContext from './contexts/CurrentUserContext';
import CurrentNewsFeedContext from './contexts/PreferredFeedContext';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ProfilePage from './components/ProfilePage';
import newsOptions from './staticdata/newsOptions';
import TopArticlesFeed from './components/TopArticlesFeed';
import TopArticleDetail from './components/TopArticleDetail';
import './App.css';
import SelectedTopArticle from './components/SelectedTopArticle';

function App() {
  const [articlesArray, setArticlesArray] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [currentNewsFeed, setCurrentNewsFeed] = useState('');
  const [topArticlesArray, setTopArticlesArray] = useState([]);

  const currentUserContextValue = useMemo(
    () => ({ currentUser, setCurrentUser }),
    [currentUser],
  );

  const currenNewsFeedContextValue = useMemo(
    () => ({ currentNewsFeed, setCurrentNewsFeed }),
    [currentNewsFeed],
  );

  // Create a Firebase project using Realtime Database and insert the automatically generated
  // info below into the firebaseConfig object. View Firebase's walthroughs for more details

  // As programmed, this assumes Realtime DB includes rules object configured in dashboard as:
  // ".read": "auth != null",
  // ".write": "auth != null"

  const firebaseConfig = {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: '',
  };

  const initializedFBApp = initializeApp(firebaseConfig);
  const analytics = getAnalytics(initializedFBApp);
  console.log('Firebase initialized with analyics:', analytics);

  // Create Newsapi.org free account and account and replace XXXX below w/ API Key
  // Do the same in all 4 staticdat/newsOptions.js options
  useEffect(() => {
    if (currentUser.uid) {
      const dbRef = ref(getDatabase());
      const newsOptionDBRef = `users/${currentUser.uid}/newsOption`;
      get(child(dbRef, newsOptionDBRef)).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log(`User News Option Data: ${data.newsOptionAPIString}`);
          setCurrentNewsFeed(data.newsOptionAPIString);
        } else {
          const newsURL = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=XXXXX';
          setCurrentNewsFeed(newsURL);
          console.log('no data avaialble');
        }
      });
    } else {
      const newsURL = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=XXXXX';
      setCurrentNewsFeed(newsURL);
      console.log('no data avaialble');
    }
  }, [currentUser.uid]);

  // Create Newsapi.org free account and account and replace XXXX below w/ API Key
  // Do the same in all 4 staticdata/newsOptions.js options  useEffect(() => {
  useEffect(() => {
    if (currentNewsFeed) {
      axios.get(currentNewsFeed)
        .then((result) => {
          console.log('Use Selected API GET Result:', result.data.articles);
          const returnedArticlesArray = result.data.articles;
          setArticlesArray(returnedArticlesArray);
        })
        .catch(console.error);
    } else {
      axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=XXXX')
        .then((result) => {
          console.log('Default API GET Result:', result.data.articles);
          const returnedArticlesArray = result.data.articles;
          setArticlesArray(returnedArticlesArray);
        })
        .catch(console.error);
    }
  }, [currentNewsFeed]);

  useEffect(() => {
    if (currentUser.uid) {
      const dbRef = ref(getDatabase());
      const topArticlesDBRef = 'articles/';
      get(dbRef, topArticlesDBRef).then((snapshot) => {
        if (snapshot.exists()) {
          const articlesAsObject = snapshot.child('articles').val();
          console.log('val object at child articles', articlesAsObject);
          const unsortedTopArray = Object.values(articlesAsObject);
          const topArray = [...unsortedTopArray].sort((a, b) => b.readersCount - a.readersCount);
          console.log('The objects as array via entries', topArray);
          setTopArticlesArray(topArray);
        } else {
          console.log('no top articles data available');
        }
      });
    }
  }, [currentUser.uid]);

  useEffect(() => {
    if (!currentUser.uid) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setCurrentUser(auth.currentUser);
          console.log('Current user:', auth.currentUser);
        } else {
          console.log('No current user:', auth.currentUser);
        }
      });
    }
  }, [currentUser.uid]);

  return (
    <Router>
      <CurrentUserContext.Provider value={currentUserContextValue}>
        <CurrentNewsFeedContext.Provider value={currenNewsFeedContextValue}>
          <Header />
          <Outlet />
          {articlesArray.length > 0
            ? (
              <Routes>
                <Route path="/" element={<Home articles={articlesArray} />} />
                <Route path="/news" element={<SelectedArticle articles={articlesArray} />}>
                  <Route path=":id" element={<ArticleDetail articles={articlesArray} />} />
                  <Route index element={<div>Select an article</div>} />
                </Route>
                <Route path="/mostread" element={<TopArticlesFeed topArticlesArray={topArticlesArray} />} />
                <Route path="/topfeed" element={<SelectedTopArticle topArticlesArray={topArticlesArray} />}>
                  <Route path=":uniqueid" element={<TopArticleDetail topArticlesArray={topArticlesArray} />} />
                  <Route index element={<div>Select an article</div>} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile/:userEmail" element={<ProfilePage />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/newsoptions" element={<NewsOptionsList newsOptions={newsOptions} />} />
              </Routes>
            )
            : <div>Loading articles...</div>}
        </CurrentNewsFeedContext.Provider>
      </CurrentUserContext.Provider>
    </Router>
  );
}

export default App;
