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
      console.log(result.data)
        TH.setState({
          parts: result.data.map(x=>{return {part: x.PART, partname: x.PARTNAME} })
        });
    });
  },

/*
              {dlink: server + "proc/"+part ,title:'תהליך', type:'p'},              
*/


  render() {

    return (
    <div >
   
        {this.state.parts.map(data => {
          var part = data.part
        	var tables = [{dlink: Tserver + "exttemp/"+part ,title:'מסמכים זמניים' + '-' + data.partname, type:'p'},
               			  {dlink: Tserver + "ext/"+part+"/Y" , title :'מסמכי איכות' + '-' + data.partname, type:'p'}]
               			  /*{dlink: Tserver + "procact/"+part+"/"+ ,title:'תהליך' + '-' + data.partname, type:'p'}]*/
	        return <Tables props={tables} key={part}/> 
          }) 
        }
    </div>
      )
  }
});
