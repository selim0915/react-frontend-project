/* eslint-disable no-console */

import * as Actions from './actions';
import { reducer } from './reducer';
import { createStore } from './redux';

const store = createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(Actions.increase());
store.dispatch(Actions.increase());
store.dispatch(Actions.increase());
store.dispatch(Actions.decrease());
store.dispatch(Actions.reset());
