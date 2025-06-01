import React from "react";

export type ProductType = {
  name: string;
  description: string;
  price: number;
};

export interface RouteItem {
  label: string; // 라우터 설명
  path: string;  // 라우터 경로
  element: React.ElementType; // 컴포넌트
  authRequired: boolean; // 로그인 필요 여부
}

export interface MenuItem {
  label: string; // 메뉴명
  showInMenu: boolean; // 메뉴 표시 여부
  roles?: string[]; // 메뉴 권한
}

export type RouteMenuItem = RouteItem & MenuItem;