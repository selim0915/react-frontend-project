/* eslint-disable no-shadow */
import { NewsFeed, NewsStore } from '../types/newFeed.type';

export default class Store implements NewsStore {
  public feeds: NewsFeed[];

  private _currentPage: number;

  constructor() {
    this.feeds = [];
    this._currentPage = 1;
  }

  get currentPage() {
    return this._currentPage;
  }

  set currentPage(page: number) {
    this._currentPage = page;
  }

  get nextPage(): number {
    return this._currentPage + 1;
  }

  get prevPage(): number {
    return this._currentPage > 1 ? this._currentPage - 1 : 1;
  }

  get numberOfFeed(): number {
    return this.feeds.length;
  }

  get hasFeeds(): boolean {
    return this.feeds.length > 0;
  }

  getFeed(position: number): NewsFeed {
    return this.feeds[position];
  }

  getAllFeeds(): NewsFeed[] {
    return this.feeds;
  }

  setFeeds(feeds: NewsFeed[]): void {
    const updatedFeeds = feeds.map((feed) => ({
      ...feed,
      read: false,
    }));
    this.feeds = updatedFeeds;
  }

  makeRead(id: number): void {
    const updatedFeeds = this.feeds.map(feed =>
      feed.id === id ? { ...feed, read: true } : feed
    );
    this.feeds = updatedFeeds;
  }
}
