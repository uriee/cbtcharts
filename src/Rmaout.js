import React from 'react'
import axios from 'axios';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import {server , getcolumnes} from './config.js';

export default React.createClass({

  getInitialState: function getInitialState() {
    return {
      data: [],
      col:[]
    };
  },

  componentDidMount: function componentDidMount() {
    var TH = this;
    this.serverRequest = axios.get(server + "rmaout").then(function (result) {
    	console.log(result.data,getcolumnes(result.data)) ;
        TH.setState({
          data: result.data,
          col: getcolumnes(result.data)
        });
    });
  },


  render() {
    return (
        <div className='height90' ref="myRef"> 
        <h3 className='center'>{this.props.title}</h3>
			<ReactTable
			  className='row'
			  data={this.state.data}
			  columns={this.state.col}
  			  showPagination={false}			  
			/>             
                    
       </div>
  
      )
  }

});

