import React from 'react'
import axios from 'axios';
import './App.css';
import Mybar from './Mybar.js';
import {server,getbardata} from './config.js';

/**
 * A class that plot the data that fetched from graph/smt2 as a bar chart
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
    this.serverRequest = axios.get(server + "graph/smt2").then(function (result) { 
        const rawdata = result.data;
        const {bardata,groups} = getbardata(rawdata);        
        TH.setState({
          bardata: bardata,
          groups: groups.filter(i => i.name > '')
        });
    });
  },


  render() {
    return (
        <div className='height90'>      
          <Mybar data={this.state.bardata} title={this.props.title} config={{ X: "X",
              datakeys:this.state.groups }} />            
        </div>
 
      )
  }

});

