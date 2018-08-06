import React from 'react'
import axios from 'axios';
import Marquee from './Marqee';
import {server} from './config.js'

export default React.createClass({

  getInitialState: function getInitialState() {
    return {
     message: ''
    };
  },


  componentDidMount: function componentDidMount() {
    this.loadMessages()
    setInterval(this.loadMessages,30000);  
  },

  loadMessages: function loadMessages() {
    const TH = this;
    this.serverRequest = axios.get(server + "messages/"+this.props.script).then(function (result) { 
        TH.setState({
          message: result.data.reduce((old,x)=>{return (x.MESSAGE > '' ? old+'. '+x.MESSAGE : old)},'')
        });
    });
  },


  render() {
    if (this.state.message > '') {
    return   <Marquee text={this.state.message} script={this.props.script} loop={true} hoverToStop={true} />
    }
    else {
      return (<div></div>)
    }
  }
});


