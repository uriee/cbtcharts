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
     parts: [],
     output: [] 
    };
  },

    

  componentDidMount: function componentDidMount() {
    const TH = this;
    this.serverRequest = axios.get(server + "getlastserialsparts/"+this.props.script).then(function (result) { 
        TH.setState({
          parts: result.data.map(x=>{return {part: x.PART, partname: x.PARTNAME} })
        })
        const tables = result.data.map(x=> {
          const tables = [{dlink: Tserver + "exttemp/"+x.PART ,title:'מסמכים זמניים'  + '-' + x.PARTNAME},
                          {dlink: Tserver + "ext/"+x.PART+"/Y" , title :'מסמכי איכות' + '-' + x.PARTNAME}]            
          return tables.map((table) => axios.get(table.dlink))
          })
          const promises = tables.reduce((o,x)=> [...o, ...x], []);
          console.log("```````````````",promises)
          Promise.all(promises).then(function (values) { 
           const res = values.reduce((o,x)=> (o===1 || x.data[0] != undefined ? 1 : 0))
           if (res === 0) TH.props.play()
         })
      })
        
    },


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
