/* eslint-disable @typescript-eslint/no-explicit-any */

export type Middleware = (store: any) => (next: any) => (action: any) => any;
export type jobsMiddleware = (jobs: any) => (store: any) => (next: any) => (action: any) => any;
export type Store = {
  dispatch: (action: any) => void;
  getState: () => any;
  subscribe: (handler: () => void) => void;
};
export type Action = {
  type: string;
  payload?: any;
};

export const actionCreator = (type: string) => (payload?: any) => ({
  type,
  payload,
});

export const createStore = (reducer: any, middlewares: Middleware[] = []) => {
  let state: any;
  const handlers: any[] = [];

  function dispatch(action: any) {
    state = reducer(state, action);
    handlers.forEach((handler) => handler());
  }

  function subscribe(handler: any) {
    handlers.push(handler);
  }

  function getState() {
    return state;
  }

  const store: Store = {
    getState,
    subscribe,
    dispatch,
  };

  const reverseMiddlewares = Array.from(middlewares).reverse();

  let lastDispatch = dispatch;
  reverseMiddlewares.forEach(middleware => {
    lastDispatch = middleware(store)(lastDispatch);
  });

  store.dispatch = lastDispatch;

  return store;
};
