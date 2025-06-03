/* eslint-disable @typescript-eslint/no-explicit-any */

export const actionCreator = (type: string) => (payload?: any) => ({
  type,
  payload,
});

export const createStore = (reducer: any) => {
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

  return {
    dispatch,
    getState,
    subscribe,
  };
};
