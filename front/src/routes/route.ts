import Admin from '../pages/admin';
import Board from '../pages/board';
import Chat from '../pages/chat';
import Login from '../pages/login';
import Main from '../pages/main';
import NewsDetailView from '../pages/news/NewsDetailView';
import NewsFeedView from '../pages/news/NewsFeedView';
import Schedule from '../pages/schedule';
import { RouteMenuItem } from '../types/core.type';

export const routeConfig: RouteMenuItem[] = [
  {
    path: '/',
    label: '',
    element: Main,
    showInMenu: false,
    authRequired: false,
  },
  {
    path: '/login',
    label: '로그인',
    element: Login,
    showInMenu: false,
    authRequired: false,
  },
  {
    path: '/board',
    label: '자유게시판',
    element: Board,
    showInMenu: true,
    authRequired: true,
  },
  {
    path: '/page/1',
    label: '공지사항',
    element: NewsFeedView,
    showInMenu: true,
    authRequired: true,
  },
  {
    path: '/show/:id',
    label: '공지사항 상세',
    element: NewsDetailView,
    showInMenu: false,
    authRequired: true,
  },
  {
    path: '/chat/*',
    label: '채팅방',
    element: Chat,
    showInMenu: true,
    authRequired: true,
  },
  {
    path: '/admin/*',
    label: '관리자 설정',
    element: Admin,
    showInMenu: true,
    authRequired: true,
    roles: ['admin'],
  },
  {
    path: '/mypage/schedule',
    label: '마이페이지',
    element: Schedule,
    showInMenu: true,
    authRequired: true,
    roles: ['user', 'admin'],
  },
];

export default routeConfig;
