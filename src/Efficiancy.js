import React from 'react'
import axios from 'axios';
import './App.css';
import {server} from './config.js';
import Gauge from './Gauge.js';



/**
 * A class that plot the state of the current efficiancies of the different lines
 */
export default React.createClass({


  getInitialState: function getInitialState() {
    return {
     data: [['Label', 'Value']],
     lines: []
    };
  },


  componentDidMount: function componentDidMount() {
    const TH = this;
    const init = [["Label","Value"]]
    this.serverRequest = axios.get(server + "graph/eff/"+this.props.param).then(function (result) { 
      var data  = init.concat(result.data.map(x=>[x.LINE, Math.round((x.WTIME / x.TTIME)*100)]))
      var data0  = init.concat(result.data.map(x=>[x.LINE, 0]))
      TH.setState({
          data: data0,
        });
      TH.setState({
          data: data,
        })
    });
  },


  render() {
    return (
    <div className='resp'>
          <h2 >{this.props.title}</h2>
          <div className='center'>  <Gauge data={this.state.data}/></div> 
     </div>
   )
  }
});



