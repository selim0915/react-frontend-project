import * as Actions from './action-type';
import { actionCreator } from './redux';

export const increase = actionCreator(Actions.INCREASE_COUNTER);
export const asyncIncrease = actionCreator(Actions.ASYNC_INCREASE_COUNTER);
export const decrease = actionCreator(Actions.DECREASE_COUNTER);
export const setCounter = actionCreator(Actions.SET_COUNTER);
