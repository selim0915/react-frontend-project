import Admin from '../pages/admin';
import Board from '../pages/board';
import Chat from '../pages/chat';
import Login from '../pages/login';
import Main from '../pages/main';
import Schedule from '../pages/schedule';
import { RouteType } from '../types/types';

export const routeConfig: RouteType[] = [
  {
    path: '/',
    element: Main,
    authRequired: false,
  },
  {
    path: '/login',
    element: Login,
    authRequired: false,
  },
  {
    path: '/board/*',
    element: Board,
    authRequired: true,
  },
  {
    path: '/chat/*',
    element: Chat,
    authRequired: true,
  },
  {
    path: '/admin/*',
    element: Admin,
    authRequired: true,
  },
  {
    path: '/mypage/schedule',
    element: Schedule,
    authRequired: true,
  },
];

export default routeConfig;
