/* eslint-disable default-param-last */

import * as Actions from './action-type';
import { Action } from './redux';

const InitializeState = {
  counter: 0,
  message: 'app store',
  request: false,
};

export default function reducer(state = InitializeState, action: Action) {
  switch (action.type) {
    case Actions.INCREASE_COUNTER:
      if (action.payload) {
        return { ...state, counter: state.counter + action.payload };
      }
      return { ...state, counter: state.counter === undefined ? 1 : state.counter + 1 };
    case Actions.DECREASE_COUNTER:
      return { ...state, counter: state.counter === undefined ? 0 : state.counter - 1 };
    case Actions.SET_COUNTER:
      return { ...state, counter: action.payload };
    case Actions.ASYNC_REQUEST:
      return { ...state, request: true };
    case Actions.ASYNC_RESPONSE:
      return { ...state, request: false };
    default:
      return { ...state };
  }
}
