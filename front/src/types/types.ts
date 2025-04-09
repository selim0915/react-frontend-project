import React from 'react';

export type RouteType = {
  path: string;
  element: React.FC;
  authRequired: boolean;
};

export type ProductType = {
  name: string;
  description: string;
  price: number;
};
