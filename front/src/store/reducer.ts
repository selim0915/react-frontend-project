/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-fallthrough */
/* eslint-disable default-param-last */

import * as Actions from './action-type';

const InitializeState = {
  message: 'app store',
  counter: 0
};

export default function reducer(state = InitializeState, action: any) {
  switch (action.type) {
    case Actions.INCREASE_COUNTER:
      return { ...state, counter: state.counter === undefined ? 1 : state.counter + 1 };
    case Actions.ASYNC_INCREASE_COUNTER:
      fetch(action.payload.url)
        .then(response => response.json())
        .then(result => ({ ...state }))
        .catch(err => ({ ...state }));
    case Actions.DECREASE_COUNTER:
      return { ...state, counter: state.counter === undefined ? 0 : state.counter - 1 };
    case Actions.SET_COUNTER:
      return { ...state, counter: action.payload };
    default:
      return { ...state };
  }
}
