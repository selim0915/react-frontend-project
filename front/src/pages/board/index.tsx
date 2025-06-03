/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import api from '../../apis/api.instance';
import * as Actions from '../../store/actions';
import { asyncJobs, asyncRouter, logger, resetCountMiddleware } from '../../store/middleware';
import reducer from '../../store/reducer';
import { createStore } from '../../store/redux';
import { ProductType } from '../../types/core.type';

// store 미들웨어 추가
const store = createStore(reducer, [resetCountMiddleware, logger, asyncRouter(asyncJobs)]);

const Board: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [productList, setProductList] = useState<ProductType[]>([]);

  useEffect(() => {
    const handler = () => {
      const state = store.getState();
      setCount(state?.counter ?? 0);
      setIsLoading(state?.request);
    };
    store.subscribe(handler);
  }, []);

  const handleIncrease = () => {
    store.dispatch(Actions.increase());
  };

  const handleAsyncIncrease = () => {
    store.dispatch(Actions.asyncIncrease({ url: '/async-increase' }));
  };

  const handleDecrease = () => {
    store.dispatch(Actions.decrease());
  };

  const handleReset = () => {
    store.dispatch(Actions.setCounter(0));
  };

  useEffect(() => {
    api.get('/product/list').then((res) => {
      setProductList(res.data);
    });
  }, []);

  return (
    <>
      <h1>Board Page</h1>

      <div>
        <p id="counter" className='text-2xl'>{count}</p>

        {isLoading && <div>Loading...</div>}

        <button type='button' id="btn-increase" className='px-4 py-2 border border-gray-300 rounded hover:bg-gray-200 
                   focus:outline-none focus:ring-2 focus:ring-gray-300' onClick={handleIncrease}>
          Increase
        </button>
        <button type='button' id="btn-async-increase" className='px-4 py-2 border border-gray-300 rounded hover:bg-gray-200 
                   focus:outline-none focus:ring-2 focus:ring-gray-300' onClick={handleAsyncIncrease}>
          Async Increase
        </button>
        <button type='button' id="btn-decrease" className='px-4 py-2 border border-gray-300 rounded hover:bg-gray-200 
                   focus:outline-none focus:ring-2 focus:ring-gray-300' onClick={handleDecrease}>
          Decrease
        </button>
        <button type='button' id="btn-reset" className='px-4 py-2 border border-gray-300 rounded hover:bg-gray-200 
                   focus:outline-none focus:ring-2 focus:ring-gray-300' onClick={handleReset}>
          Reset
        </button>
      </div>

      {productList.map((item, index) => {
        const idx = `${item}-${index}`;
        return (
          <ul key={idx}>
            <li>{item.name}</li>
            <li>{item.description}</li>
            <li>{item.price}</li>
          </ul>
        );
      })}
    </>
  );
};

export default Board;
