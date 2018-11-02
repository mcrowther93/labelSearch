import {authorise} from './'
import {beginSearchSaga} from './Search'
import {beginViewDevices} from './devices'

import { fork, all, takeEvery } from 'redux-saga/effects'

export function *watchAll() {

        yield fork(authorise);
        yield fork(beginSearchSaga);
        yield fork(beginViewDevices);

  }