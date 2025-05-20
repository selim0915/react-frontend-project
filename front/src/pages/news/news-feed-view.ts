/* eslint-disable no-restricted-globals */
import { NewsFeedApi } from '../../core/api';
import View from '../../core/view';
import { NewsFeed } from '../../types';

export default class NewsFeedView extends View {
  api: NewsFeedApi;

  feeds: NewsFeed[];

  constructor(containerId: string) {
    const template = `
    <div class="bg-gray-600 min-h-screen">
      <div class="bg-white text-xl">
        <div class="mx-auto px-4">
          <div class="flex justify-between items-center py-6">
            <div class="flex justify-start">
              <h1 class="font-extrabold">Hacker News</h1>
            </div>
            <div class="items-center justify-end">
              <a href="#/page/{{__prev_page__}}" class="text-gray-500">
                Previous
              </a>
              <a href="#/page/{{__next_page__}}" class="text-gray-500 ml-4">
                Next
              </a>
            </div>
          </div> 
        </div>
      </div>
      <div class="px-4 pt-4 text-white">{{__total_news_feed__}}</div>
      <div class="px-4 text-2xl text-gray-700">
        {{__news_feed__}}        
      </div>
    </div>
  `;
    super(containerId, template);

    this.api = new NewsFeedApi();
    this.feeds = window.store.feeds;

    if (this.feeds.length === 0) {
      const makeNewsFeed = this.api.getData();
      window.store.feeds = makeNewsFeed;
      this.feeds = makeNewsFeed;

      this.makeFeeds();
    }
  }

  makeFeeds(): void {
    this.feeds.map((feed) => ({
      ...feed,
      read: false,
    }));
  }

  render(): void {
    window.store.currentPage = Number(location.hash.substr(7) || 1);

    for (let i = (window.store.currentPage - 1) * 10; i < window.store.currentPage * 10; i += 1) {
      if (!this.feeds[i]) break;

      const { read, id, title, comments_count: commentsCount, user, points, time_ago: timeAgo } = this.feeds[i];
      this.addHtml(`
      <div class="p-6 ${
        read ? 'bg-red-500' : 'bg-white'
      } mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100">
        <div class="flex">
          <div class="flex-auto">
            <a href="#/show/${id}">${title}</a>  
          </div>
          <div class="text-center text-sm">
            <div class="w-10 text-white bg-green-300 rounded-lg px-0 py-2">${commentsCount}</div>
          </div>
        </div>
        <div class="flex mt-3">
          <div class="grid grid-cols-3 text-sm text-gray-500">
            <div><i class="fas fa-user mr-1"></i>${user}</div>
            <div><i class="fas fa-heart mr-1"></i>${points}</div>
            <div><i class="far fa-clock mr-1"></i>${timeAgo}</div>
          </div>  
        </div>
      </div>    
    `);
    }
    const totalPages = Math.ceil(this.feeds.length / 10);

    this.setTemplateData('news_feed', this.getHtml());
    this.setTemplateData('total_news_feed', `${window.store.currentPage} / ${totalPages}`);
    this.setTemplateData('prev_page', String(window.store.currentPage > 1 ? window.store.currentPage - 1 : 1));
    this.setTemplateData(
      'next_page',
      String(window.store.currentPage < totalPages ? window.store.currentPage + 1 : window.store.currentPage),
    );

    this.updateView();
  }
}
