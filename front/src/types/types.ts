import React from 'react';
import View from '../core/view';

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

export interface RouteInfo {
  path: string;
  page: View;
  params: RegExp | null;
}
