const ajax = new XMLHttpRequest();

const contaniner = document.getElementById('root');

const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

const store = {
  currentPage: 1,
};

function getData(url) {
  ajax.open('GET', url, false);
  ajax.send();

  return JSON.parse(ajax.response);
}

function newsFeedList() {
  const newsFeed = getData(NEWS_URL);
  const newsList = [];
  const totalPages = Math.ceil(newsFeed.length / 10);

  newsList.push('<ul>');

  for (let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i += 1) {
    if (!newsFeed[i]) break;

    newsList.push(`
    <li>
      <a href="#/show/${newsFeed[i].id}">
        ${newsFeed[i].title} (${newsFeed[i].comments_count})
      </a>
    </li>
    `);
  }

  newsList.push('</ul>');
  newsList.push(`<div>Page ${store.currentPage} / ${totalPages}</div>`);
  newsList.push(`
    <div>
      <a href="#/page/${store.currentPage > 1 ? store.currentPage - 1 : 1}">이전</a>
      <a href="#/page/${store.currentPage < totalPages ? store.currentPage + 1 : store.currentPage}">다음</a>
    </div>  
  `);
  contaniner.innerHTML = newsList.join('');
}

function newsDetail() {
  // eslint-disable-next-line no-restricted-globals
  const id = location.hash.substr(7);
  const newsContent = getData(CONTENT_URL.replace('@id', id));

  contaniner.innerHTML = `
  <h1>${newsContent.title}</h1>
  
  <div>
    <a href="#/page/${store.currentPage}">목록으로</a>
  </div>
  `;
}

function router() {
  // eslint-disable-next-line no-restricted-globals
  const routePath = location.hash;

  if (routePath === '') {
    newsFeedList();
  } else if (routePath.indexOf('#/page/') >= 0) {
    store.currentPage = Number(routePath.substr(7));
    newsFeedList();
  } else {
    newsDetail();
  }
}

window.addEventListener('hashchange', router);

router();
