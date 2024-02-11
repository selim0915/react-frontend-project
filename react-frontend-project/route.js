import Login from './src/components/login/Login';
import Board from './src/components/board/Board';
import Chat from './src/components/chat/Chat';
import Main from './src/components/main/Main';

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
