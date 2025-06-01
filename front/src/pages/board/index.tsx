import React, { useEffect, useState } from 'react';
import api from '../../apis/api.instance';
import { ProductType } from '../../types/types';

const Board: React.FC = () => {
  const [productList, setProductList] = useState<ProductType[]>([]);

  useEffect(() => {
    api.get('/product/list').then((res) => {
      setProductList(res.data);
    });
  }, []);

  return (
    <>
      <h1>Board Page</h1>
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
