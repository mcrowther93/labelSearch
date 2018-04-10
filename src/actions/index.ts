import { createAction } from 'redux-actions';

export const COUNT_INCREMENT: string = 'CountIncrement';
export const incrementCounter = createAction(COUNT_INCREMENT);

export const COUNT_DECREMENT: string = 'CountDecrement';
export const decrementCounter = createAction(COUNT_DECREMENT);