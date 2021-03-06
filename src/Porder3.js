import React from 'react'
import axios from 'axios';
import './App.css';
import Mybar from './Mybar.js';
import {getbardata} from './config.js';


export default React.createClass({

  getInitialState: function getInitialState() {
    return {
      bardata: [],
      groups: []
    };
  },


  componentDidMount: function componentDidMount() {
    const TH = this;
    this.serverRequest = axios.get("http://192.9.200.17:4000/graph/porder3").then(function (result) { 
      console.log(result.data)
        const rawdata = result.data;
        const {bardata,groups} = getbardata(rawdata);        
        TH.setState({
          bardata: bardata,
          groups: groups
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

