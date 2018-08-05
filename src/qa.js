import React from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import Tables from './Tables.js';
import {server} from './config.js'

const Tserver = 'http://192.9.200.10:4001/inter/';

export default React.createClass({

  getInitialState: function getInitialState() {
    return {
     parts: []
    };
  },

  componentDidMount: function componentDidMount() {
    const TH = this;
    console.log("props:",this.props)
    this.serverRequest = axios.get(server + "getlastserialsparts/"+this.props.script).then(function (result) { 
        TH.setState({
          parts: result.data,
        });
    });
  },


  render() {

    return (
    <div>
   
        {this.state.parts.map(part => {
        	var tables = [{dlink: Tserver + "exttemp/"+part ,title:'מסמכים זמניים', type:'p'},
               			  {dlink: Tserver + "ext/"+part+"/Y" , title :'מסמכי איכות', type:'p'},
               			  {dlink: Tserver + "proc/"+part ,title:'תהליך', type:'p'}]
	        return <Tables props={tables} key={part}> 
          }) 
        }
    </div>
      )
  }
});
