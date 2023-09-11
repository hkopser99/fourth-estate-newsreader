# fourth-estate-newsreader
Fourth Estate - Newsreader Built with React and Firebase Realtime DB

Fourth Estate – ReactJS and Firebase Newsreader 

Fourth Estate is a re-creation of an iOS App I developed and owned (no longer on the app store). This app was focused on aggregating and gamifying political news. It was reviewed by and received positive recognition from publications including Philadelphia.com and MacWorld.com. 

This version of Fourth Estate is designed with:

-React frontend
-Firebase’s Realtime Database for auth and data storage and a Firebase server (see app.js for instructions on how to connect your own firebase projec)
-The news feeds are pulled from the www.NewsAPI.org api via a free account (see app.js and staticdata/newsOptions for instructions on how to 'Get') 

While this was developed w/ Firebase Realtime DB, any independently developed Node.js backend or alternative BaaS can be seamlessly integrated to replace the Firebase tools used in the default version, likely with minimal code changes

Whether you want a news reader starter app to add to an existing app or simply one to use to bootstrap a new project, Fourth Estate can serve as an ideal resource. Alternatively, if you are newer to React and are curious how to integrate this Frontend library with a backend, Fourth Estate uses modern React best practices and proves easy to follow practical examples of useState(), useEffect(), useContext(), useRef(), useMemo(), custom Hooks, and more. 

I opted to make custom login/signup pages. These can easily be replaced with pre-made Auth UIs or expanded upon to add pre-made auth options alongside the custom UI. The login/signup and Profile pages include relatively basic verification code, which can be expanded upon.

While not written with TypeScript, the prop-types library was utilized to help structure the data and 

Simple styling is provided via CSS files for the React components. These are designed to easily be adjusted, replaced, or used as-is. 

Project dependencies Fourth Estate requires: 

ES-Lint Airbnb  

Prop-Types 

Axios 

React-Router 

Firebase

(Firebase include option to CURL server if needed) 
 


Understanding the App's Functionality and Data Flow: 

 
This is a single page app with a single Router context. View App.js to understand flow of routes w/ their respective children routes (where applicable).

There are two custom hooks used, which provide access to 2 Contexts: useCurrentUserContext and usePreferredFeedContext.

When the app initially renders a logged in user will be checked for via a useMemo() and useEffect() hook combo. If logged in various components will conditionally be rendered (see below). A similar useMemo() and useEffect() hook combo is used to check for a preffered news feed. Both the current user and preffered newsfeed are stored in contexts accessed be the aformentioned custom hooks.



<Home> component: presents the articles feed w/ either a default newsfeed or the user's selected newsOption (selected options are stored in firebase).


<Header> Component presents:  

<H1> 'Fourth Estate' (<Link> to home ‘/’)

'Top Articles' Link (conditionally rendered if used logged in as <Link> to ‘/mostread’) 

Profile (rendered is user logged in as <button> to `/profile/${currentUser.email}` which allows user to change some account info  

<NewsOptions> Component (conditionally rendered when user logged in to link to ‘/newsoptions’ where preffered newsfeed can be chosen)

<UserDetails> Component (Conditionally renders w/ either login button or user email/log out button if logged in) 

__________

The array of top articles that are passed to <TopArticlesFeed> come via a get() call to Realtime DB in App.js

The array of new articles passed to <Home> come via an get() call to newsapi (requires free account setup). The newsapi string will based on the user's selected newsoption (if applicable) or the default supplies to guests and users alike (breaking US news).

Home and top articles feeds function similarly. Once an article is selected it is presented anew in a detail component and the page also displays the articles feed via a sidebar (both are child components of a <SelectedArticle> component.

When an article is selected in the <ArticlesFeed> via a click on an <ArticleInFeed> component, it then appears in the <SelectedArticle> compnent then conditionally saved to FB Realtime DB via useEffect in the ArticleDetail component. This save only occurs if a loggedin user is confirm. Additionally, if user is logged in and this now saved article is viewed outside of Fourth Estate via 'Read Full Article' <a>, this will increment its readThroughCount property.

Roughly the same functionality occurs in the flow of the <TopArticlesFeed> once an article is clicked. However, instead of having to create the article object it simply increments its readersCount attribute and the same readThroughCount incrementing functionaly occurs via useEffect().

___________

The preferred newsfeed API string checked for at render of App.js will determine which news articles are presented via the <Home> component's <ArticlesFeed> component and the <SelectedArticle> component's <ArticlesFeed> sidebar. If the user is logged in this check will see if they have a NewsOption child in the Realtime DB. If not it will default to the breaking US news feed (same feed presented to non-logged in users).

The <NewsOptions> component (conditionally accessed/renedered via header) allows users to change their preferred newsfeed. Their options are hardcoded in the staticdata/newsOptions.js file and can easily be amended or moved to the database if desired.

A selection of a different preferred news option will update the state of the preferred feed via the useCurrentNewsFeed() hook and this will remove the current articlesArray contents and trigger a new call to the newsAPI to replace the prior array saved via useState() in articlesArray.
___________

<Login> component is a Route element, as is <SignUp>. "/login" is accessed via the header's link (when rendered) and "/signup" is accessed via a link in the <Login> component. 

<SignUp> uses React Router's useNavigate() hook to then go to the "/profile/:userEmail" path after a successful signup. The Profile page includes optional input areas and a conditionally enabled save button. <Profile> component's route can also be accessed by a conditionally rendered button in <Header> component rendered only for logged in users.
____________

<NotFound> component is presented when <Router> cannot determine where to go.

____________

Multiple easily accessible Routes include conditionally rendered info if user is logged in or present an invitation to login if not. Most would not be visited even accidentally, but this is important particularly in components involved w/ Realtime DB set()/update()/get() calls.

____________

You are invited to recommend updates to Fourth Estate, which can include refactoring, added functionally, and anyting else that can improve the use and scalability of this app. 

-HK






