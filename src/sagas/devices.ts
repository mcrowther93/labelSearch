import { takeEvery, put, call, take, select, takeLatest } from 'redux-saga/effects'
import { setDevices, VIEW_DEVICES} from '../actions/Devices'
import apiActions from '../utilites/apiActions';

import * as _ from 'lodash'

function* getAvailableDevices() {

    const response = yield apiActions.getAvailableDevices();
    yield put(setDevices(response.data.devices))

}


// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* beginViewDevices() {
    yield takeLatest(VIEW_DEVICES, getAvailableDevices)
  }