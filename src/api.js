import axios from 'axios';


export async function getForecast() {
  return axios.get('https://api.open-meteo.com/v1/forecast?latitude=41.79&longitude=44.74&current_weather=true&timezone=auto')
}

export async function getPublicHolidays() {
  return axios.get('https://date.nager.at/api/v3/publicholidays/2023/RU')
}

export async function getNews() {
  return axios.get('https://content.guardianapis.com/uk-news?api-key=a04d1215-c861-4577-bb98-eacebf2194f9&show-blocks=body:latest:10')
}


axios.get('https://date.nager.at/api/v3/publicholidays/2023/RU')
  .then(res => {
    const apiRes2 = res.data;
    const date = new Date();
    const formatDate = date.toISOString();
    document.querySelector('.today-is').textContent = 'Just ordinary day:(';
    for (const key in apiRes2) {
      if (formatDate.slice(0, 10) == apiRes2[key].date) {
        document.querySelector('.today-is').textContent = apiRes2[key].name;
      }
    }
  })

axios.get('https://content.guardianapis.com/uk-news?api-key=a04d1215-c861-4577-bb98-eacebf2194f9&show-blocks=body:latest:10')
  .then(res => {
    const apiRes3 = res.data.response;
    const apiResults = apiRes3.results;
    console.log(apiRes3);
    document.querySelector('.title').textContent = apiRes3.edition.webTitle + ' : ' + 'Last 10 articles';
    document.querySelector('.title').href = apiRes3.edition.webUrl;
    const articles = document.getElementById('articles');
    for (const key in apiResults) {
      const li = document.createElement('li');
      const article = document.createElement('a');
      article.textContent = apiResults[key].webTitle;
      article.href = apiResults[key].webUrl;
      li.className = 'url';
      article.className = 'url';
      article.target = '_blank';
      li.appendChild(article);
      articles.appendChild(li);
    }
  })

