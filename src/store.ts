import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import {reducers} from './reducers'

import {watchAll} from './sagas/rootSaga'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
const store = createStore(
  reducers,
  compose(applyMiddleware(sagaMiddleware), window.devToolsExtension ? window.devToolsExtension() : f => f)

  
)
 
// then run the saga
sagaMiddleware.run(watchAll)

export default store;
 
// render the application