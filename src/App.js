import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router'
import Container from './Container'

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
    <Route path="/t" component={Container} script="t"/>
    <Route path="/purchase" component={Container} script="purchase"/> 
    <Route path="/serial" component={Container} script="serial"/>    
    <Route path="/rma" component={Container} script="rma" />
    <Route path="/akda" component={Container} script="akda"/>    
    <Route path="/smt" component={Container} script="smt"/>   
    <Route path="/sel" component={Container} script="sel"/>  
    <Route path="/aqt" component={Container} script="aqt"/> 
    <Route path="/wave" component={Container} script="wave"/>         
    <Route path="/test" component={Container} script="test"/>  
    <Route path="/mks" component={Container} script="mks"/>                       
    <Route path="/phy" component={Container} script="phy"/>      
    <Route path="/int" component={Container} script="int"/>  
    <Route path="/acs" component={Container} script="acs"/>      
  </Router>
    )
  }
}

export default App;
