// Create Newsapi.org free account and account and replace XXXX below w/ API Key
const newsOptions = [
  {
    optionId: 'USTopBreaking',
    optionName: 'Top Breaking News in the US',
    optionDescription: 'Read breaking US News here',
    optionAPIString: 'https://newsapi.org/v2/top-headlines?country=us&apiKey=XXXX',
  },
  {
    optionId: 'UKTopBreaking',
    optionName: 'Top Breaking News in the UK',
    optionDescription: 'Read breaking UK News Here',
    optionAPIString: 'https://newsapi.org/v2/top-headlines?country=gb&apiKey=XXXX',
  },
  {
    optionId: 'GermanBreaking',
    optionName: 'Top Breaking News in Germany',
    optionDescription: 'Lesen Sie hier Deutsche Nachrichten',
    optionAPIString: 'https://newsapi.org/v2/top-headlines?country=de&apiKey=XXXX',
  },
  {
    optionId: 'JapanBreaking',
    optionName: 'Top Breaking News in Japan',
    optionDescription: 'Read breaking Japanese News Here',
    optionAPIString: 'https://newsapi.org/v2/top-headlines?country=jp&apiKey=XXXX',
  },
];

export default newsOptions;
