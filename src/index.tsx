
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import store from './store'
import Auth2 from './containers/auth'
import { BrowserRouter, Route } from 'react-router-dom'


const Index = () => {
  return <div>Hello React!</div>;
};


const App  = () => <Provider store={store}><BrowserRouter>
  <Route path="/auth" component={Auth2}>
  
  </Route>

</BrowserRouter>
</Provider>;

ReactDOM.render(<App  />, document.getElementById("app"));