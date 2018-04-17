import {authorise} from './'
import {beginSearchSaga} from './Search'
import { fork, all, takeEvery } from 'redux-saga/effects'

export function *watchAll() {

        yield fork(authorise);


        yield fork(beginSearchSaga);

  }