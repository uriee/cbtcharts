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
     data: [],
     lines: []
    };
  },


  componentDidMount: function componentDidMount() {
    const TH = this;
    console.log("props:",this.props)
    this.serverRequest = axios.get(server + "graph/eff/"+this.props.param).then(function (result) { 
      var data  = result.data
      TH.setState({
          data: data,
        });
    });
  },


  componentWillUnmount: function componentWillUnmount() {
    this.serverRequest.reject;
  },

  render() {

    return (
    <div className='resp'>
          <h2 >{this.props.title}</h2>
          {this.state.data.map(line => {
            return <div key = {line.LINE} > 

                    <div className='gauge'>  <Gauge value={(line.WTIME / line.TTIME)*100} title={line.LINE}/></div> 
                   </div>   
          }) 
        }
     </div>
   )
  }
});



