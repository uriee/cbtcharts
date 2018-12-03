import React from 'react'
import axios from 'axios';
import './App.css';
import {server} from './config.js';

var Logo = React.createClass({
    render: function() {
        return <div className="img-responsive"><img className="logo" src={require('../public/logo.jpg')}  role="presentation"/> </div>
    }
});

/**
 * A class that plot the state of the current running serials
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
    this.serverRequest = axios.get(server + "graph/plan/"+this.props.param).then(function (result) { 
      var data  = result.data
      var lines = data.map(x => x.LINE).filter((item, i, ar) =>  ar.indexOf(item) === i )
      TH.setState({
        data: data,
        lines: lines
      });
    });
  },

  render() {
    var { lines, data } = this.state    
    return (
    <div>
    <Logo/><br/><br/>
     
        {
          lines.map(line => {
            var lineData = data.filter(x => x.LINE === line)
            var lineDisply = lineData.map(x=> (
              <div className='left15'>
                <div className='left50'>
                 <h4>{x.PARTNAME}</h4>
                 <div>{x.SERIALNAME}</div>
                 <div>{x.ACTNAME}</div>
                </div>
              </div>))

            return (
            <div className='fly-row' key={line}> 
              <div className='fly-line' >
                <h1 className='left15'>{line}</h1>
              </div> 
              {lineDisply}       
              <hr/>
            </div>   
            )
          }) 
        }
    </div>
    )
  }
});



