
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import store from './store'
import Auth2 from './containers/auth'
import Home from './containers/home'
import AlbumDetails from './containers/AlbumDetails'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import StickyHeader from './containers/StickyHeader'
import './styles/main.css'


const App = () => 
  <Provider  store={store}>
<BrowserRouter  >
  <Switch  >

    <Route exact path="/" component={Home} />
    <Route path="/auth" component={Auth2} />
    <Route path="/albums/:id" component={AlbumDetails} />
  </Switch>


</BrowserRouter>
</Provider>
;

ReactDOM.render(<div className={'background'}><App /></div>, document.getElementById("app"));