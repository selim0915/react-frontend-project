/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNewsStore } from '../..';
import { NewsDetailApi } from '../../apis/newFeed.api';
import { NewsComment } from '../../types/newFeed.type';

const Comment: React.FC<{ comment: NewsComment }> = ({ comment }) => (
  <>
    <div
      style={{ paddingLeft: `${comment.level * 40}px` }}
      className="mt-4"
    >
      <div className="text-gray-400">
        <i className="fa fa-sort-up mr-2" />
        <strong>{comment.user}</strong> {comment.time_ago}
      </div>
      <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: comment.content }} />
    </div>
    {comment.comments.length > 0 &&
      comment.comments.map((child) => (
        <Comment key={child.id} comment={child} />
      ))}
  </>
);

const NewsDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const store = useNewsStore();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [comments, setComments] = useState<NewsComment[]>([]);
  const { currentPage } = store;

  useEffect(() => {
    const fetchDetail = async () => {
      if (id) {
        const api = new NewsDetailApi(id);
        const { title, content, comments } = await api.getData();

        setTitle(title);
        setContent(content);
        setComments(comments);

        store.makeRead(Number(id));
      }
    };

    fetchDetail();
  }, [id, store]);

  return (
    <div className="bg-gray-600 min-h-screen pb-8">
      <div className="bg-white text-xl">
        <div className="mx-auto px-4">
          <div className="flex justify-between items-center py-6">
            <div className="flex justify-start">
              <h1 className="font-extrabold">Hacker News</h1>
            </div>
            <div className="items-center justify-end">
              <Link to={`/page/${currentPage}`} className="text-gray-500">
                <i className="fa fa-times" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="h-full border rounded-xl bg-white m-6 p-4">
        <h2>{title}</h2>
        <div
          className="text-gray-400 h-20"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <div>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsDetailView;
