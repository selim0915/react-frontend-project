const ajax = new XMLHttpRequest();

const contaniner = document.getElementById('root');

const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

function getData(url) {
  ajax.open('GET', url, false);
  ajax.send();

  return JSON.parse(ajax.response);
}

function newsFeedList() {
  const newsFeed = getData(NEWS_URL);
  const newsList = [];
  newsList.push('<ul>');

  for (let i = 0; i < 10; i += 1) {
    newsList.push(`
    <li>
      <a href="#${newsFeed[i].id}">
        ${newsFeed[i].title} (${newsFeed[i].comments_count})
      </a>
    </li>
    `);
  }

  newsList.push('</ul>');
  contaniner.innerHTML = newsList.join('');
}

function newsDetail() {
  // eslint-disable-next-line no-restricted-globals
  const id = location.hash.substr(1);
  const newsContent = getData(CONTENT_URL.replace('@id', id));

  contaniner.innerHTML = `
  <h1>${newsContent.title}</h1>
  
  <div>
    <a href="#">목록으로</a>
  </div>
  `;
}

function router() {
  // eslint-disable-next-line no-restricted-globals
  const routePath = location.hash;

  if (routePath === '') {
    newsFeedList();
  } else {
    newsDetail();
  }
}

window.addEventListener('hashchange', router);

router();
