import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router'
import Container from './Container'
import Myprogress from './Myprogress'

/**
 * This class is the root of the cockpitture app.
 * it is the where the routes declared.
 * @name  App
 * @example in order to declare a new script add a line to the router  :  <Route path="/smt" component={Container} script="smt"/> 
 */
class App extends Component {

  render() {
    return (
  <Router history={hashHistory}>
    <Route path="/" component={Container}/>
    <Route path="/test" component={Myprogress}/>
    <Route path="/purchase" component={Container} script="purchase"/> 
    <Route path="/serial" component={Container} script="serial"/>    
    <Route path="/rma" component={Container} script="rma"/>
    <Route path="/smt" component={Container} script="smt"/>   
    <Route path="/sel" component={Container} script="sel"/>                   
  </Router>
    );
  }
}

export default App;
