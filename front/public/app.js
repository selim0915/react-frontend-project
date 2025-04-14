const ajax = new XMLHttpRequest();

const contaniner = document.createElement('div');

const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

ajax.open('GET', NEWS_URL, false);
ajax.send();

const newsFeed = JSON.parse(ajax.response);

const ul = document.createElement('ul');

window.addEventListener('hashchange', () => {
  // eslint-disable-next-line no-restricted-globals
  const id = location.hash.substr(1);

  ajax.open('GET', CONTENT_URL.replace('@id', id), false);
  ajax.send();

  const newsContent = JSON.parse(ajax.response);
  const title = document.createElement('h1');

  title.innerHTML = newsContent.title;
  contaniner.appendChild(title);
});

for (let i = 0; i < 10; i += 1) {
  const li = document.createElement('li');
  const a = document.createElement('a');

  a.href = `#${newsFeed[i].id}`;
  a.innerHTML = `${newsFeed[i].title}(${newsFeed[i].comments_count})`;

  li.appendChild(a);
  ul.appendChild(li);
}

document.getElementById('root').appendChild(ul);
document.getElementById('root').appendChild(contaniner);
