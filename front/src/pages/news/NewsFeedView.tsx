/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNewsStore } from '../..';
import { NewsFeedApi } from '../../apis/newFeed.api';
import { NewsFeed } from '../../types/newFeed.type';

export const NewsFeedView: React.FC = () => {
  const store = useNewsStore();
  const { page = '1' } = useParams();
  const currentPage = Number(page);
  const [localfeeds, setLocalFeeds] = useState<NewsFeed[]>([]);

  useEffect(() => {
    const fetchFeeds = async () => {

      if (!(store.feeds.length > 0)) {
        const api = new NewsFeedApi();
        const data: NewsFeed[] = await api.getData();
        setLocalFeeds(data);
        store.setFeeds(data);
      } else {
        setLocalFeeds(store.feeds);
      }
    };

    fetchFeeds();
  }, [store, localfeeds]);

  const start = (currentPage - 1) * 10;
  const end = currentPage * 10;
  const currentFeeds = localfeeds.slice(start, end);

  const prevPage = currentPage > 1 ? currentPage - 1 : 1;
  const lastPage = Math.ceil(localfeeds.length / 10) || 1;
  const nextPage = currentPage + 1 > lastPage ? lastPage : currentPage + 1;

  const renderFeeds = () => currentFeeds.map((feed) => (
    <div
      key={feed.id}
      className={`p-6 rounded-lg shadow-md transition-colors duration-500 ${feed.read ? 'bg-red-500' : 'bg-white'
        } hover:bg-green-100`}
    >
      <div className="flex">
        <div className="flex-auto">
          <Link to={`/show/${feed.id}`}>{`${feed.id}. ${feed.title}`}</Link>
        </div>
        <div className="text-center text-sm">
          <div className="w-10 text-white bg-green-300 rounded-lg px-0 py-2">
            {feed.comments_count}
          </div>
        </div>
      </div>
      <div className="flex mt-3">
        <div className="grid grid-cols-3 text-sm text-gray-500">
          <div>
            <i className="fas fa-user mr-1" />
            {feed.user}
          </div>
          <div>
            <i className="fas fa-heart mr-1" />
            {feed.points}
          </div>
          <div>
            <i className="far fa-clock mr-1" />
            {feed.time_ago}
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="bg-gray-600 min-h-screen">
      <div className="bg-white text-xl">
        <div className="mx-auto px-4">
          <div className="flex justify-between items-center py-6">
            <div className="flex justify-start">
              <h1 className="font-extrabold">Hacker News</h1>
            </div>
            <div className="items-center justify-end">
              <Link
                to={`/page/${prevPage}`}
                className="text-gray-500"
              >
                Previous
              </Link>
              <Link
                to={`/page/${nextPage}`}
                className="text-gray-500 ml-4"
              >
                Next
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 p-4 text-2xl text-gray-700">{renderFeeds()}</div>
    </div>
  );
}

export default NewsFeedView;
