import { createContext, useContext } from 'react';

const CurrentNewsFeedContext = createContext();

CurrentNewsFeedContext.displayName = 'CurrentNewsFeed';

export const useCurrentNewsFeedContext = () => {
  const context = useContext(CurrentNewsFeedContext);
  return context;
};

export default CurrentNewsFeedContext;
