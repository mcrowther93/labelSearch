import { createAction } from 'redux-actions';

export const COUNT_INCREMENT: string = 'CountIncrement';
export const incrementCounter = createAction(COUNT_INCREMENT);
