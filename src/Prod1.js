import React from 'react'
import axios from 'axios';
import './App.css';
import Myline from './Myline.js';
import {server, getlinedata} from './config.js';

/**
 * A class that plot the data that fetched from graph/sel1 as a line chart
 */
export default React.createClass({

  getInitialState: function getInitialState() {
    return {
      bardata: [],
      groups: []
    };
  },


  componentDidMount: function componentDidMount() {
    const TH = this;
    this.serverRequest = axios.get(server + "graph/prod1/" + this.props.type).then(function (result) { 
        const rawdata = result.data;
        const {linedata,groups} = getlinedata(rawdata);        
        TH.setState({
          linedata: linedata,
          groups: groups.filter(i => i.name > '')
        });
    });
  },


  render() {
    return (
        <div className='height90'>      
          <Myline data={this.state.linedata} title={this.props.title} config={{ X: "X",
              datakeys:this.state.groups }} />            
        </div>
 
      )
  }

});

