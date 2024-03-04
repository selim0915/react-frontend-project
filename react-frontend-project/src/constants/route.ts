import Login from '../components/login/Login';
import Board from '../components/board/Board';
import Chat from '../components/chat/Chat';
import Main from '../components/main/Main';

export const routeConfig = [
  {
    path: '/',
    element: Main,
    authRequired: false
  },
  {
    path: '/login',
    element: Login,
    authRequired: false
  },
  {
    path: '/board/*',
    element: Board,
    authRequired: true
  },
  {
    path: '/chat/*',
    element: Chat,
    authRequired: true
  }
];
