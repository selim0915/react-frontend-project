import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const Board: React.FC = () => {
  const [productList, setProductList] = useState<any[]>([]);

  useEffect(() => {
    api
      .get('/proxy/db/product/list')
      .then(function (res) {
        setProductList(res.data);
      })
      .catch(function (err) {
        console.error(err);
      });
  }, []);

  return (
    <>
      <h1>Board</h1>
      {productList.map((item: any, index: any) => {
        return (
          <ul key={index}>
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
