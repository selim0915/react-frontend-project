import React, { useEffect, useState } from 'react';
import api from '../../apis/api.instance';
import * as Actions from '../../store/actions';
import reducer from '../../store/reducer';
import { createStore } from '../../store/redux';
import { ProductType } from '../../types/core.type';

const store = createStore(reducer);

const Board: React.FC = () => {
  const [counter, setCounter] = useState<number>(0);
  const [productList, setProductList] = useState<ProductType[]>([]);

  useEffect(() => {
    const handler = () => {
      const state = store.getState();
      const val = state?.counter ?? 0;
      setCounter(val);
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
        <p id="counter" className='text-2xl'>{counter}</p>

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
