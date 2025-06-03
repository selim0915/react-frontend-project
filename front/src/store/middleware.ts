/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ASYNC_INCREASE_COUNTER, SET_COUNTER } from "./action-type";
import * as Actions from './actions';
import { Action, jobsMiddleware, Middleware, Store } from "./redux";

export const resetCountMiddleware: Middleware = (store) => (next) => (action) => {
  console.log('m1 =>', action);

  if (action.type === SET_COUNTER) {
    action.payload = 100;
  }

  next(action)
};

export const logger: Middleware = (store) => (next) => (action) => {
  const currentState = store.getState();

  console.groupCollapsed('== action logger => ', action.type);
  console.log('current state: ', currentState);
  console.log('action payload', action.payload);
  console.groupEnd();

  next(action);
};


type Job = (store: any, action: any) => void;
type Jobs = { [type: string]: Job };

export const asyncRouter: jobsMiddleware = (jobs: Jobs) => (store) => (next) => (action) => {
  const matchJob = Object.entries(jobs).find(([type]) => action.type === type);

  if (matchJob) {
    matchJob[1](store, action);
  } else {
    next(action);
  }
}

export const asyncJobs: Record<string, (store: Store, action: Action) => void> = {
  [ASYNC_INCREASE_COUNTER](store, action) {
    store.dispatch(Actions.asyncRequest());
    setTimeout(() => {
      store.dispatch(Actions.increase(20));
      store.dispatch(Actions.asyncResponse());
    }, 3000);
  },
}
