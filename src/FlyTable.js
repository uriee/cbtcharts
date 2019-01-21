import React from 'react'
import axios from 'axios';
import './App.css';
import {server} from './config.js';
import SerialBox from './SerialBox.js';


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
    this.serverRequest = axios.get(server + "graph/fly/"+this.props.param).then(function (result) { 
      var data  = result.data
      var lines = data.map(x => x.LINE).filter((item, i, ar) =>  ar.indexOf(item) === i )
        TH.setState({
          data: data,
          lines: lines
        });
    });
  },


  render() {

    return (
    <div>
    <Logo/>
        <div className='fly-header'> 
          <div className='fly-line'>  &nbsp; </div> 
          <div className='fly-incoming'><div className="img-responsive"><img  className="plane" src={require('../public/lift1.png')}  role="presentation"/> </div></div> 
          <div className='fly-run'><div className="img-responsive"><img  className="plane" src={require('../public/fly1.png')}  role="presentation"/> </div></div> 
          <div className='fly-past'><div className="img-responsive"><img  className="plane" src={require('../public/land1.png')}  role="presentation"/> </div></div>   
          <hr/>   
        </div>       
        {this.state.lines.map(row => {

          var data = this.state.data,
          incoming = data.filter(x => (x.LINE===row && x.STATUS==="1"))[0],
          run = data.filter(x => (x.LINE===row && x.STATUS==="2"))[0],
          past = data.filter(x => (x.LINE===row && x.STATUS==="3"))[0],
          delay = parseInt(incoming.DELAY/60,0) +':'+ incoming.DELAY % 60,
          delaystyle =(incoming.DELAY > 60 ? "#ff776F" : "#000000" ) 

        return <div className='fly-row' key={row}> 
          <div className='fly-line' >
            <h2>{row}</h2>
            <span style={{color:delaystyle}}>{(incoming.DELAY> 0 ? delay : '')}</span> 
          </div> 
          <div className='fly-incoming'><SerialBox data={incoming}/></div> 
          <div className='fly-run'><SerialBox data={run}/></div>
          <div className='fly-past'><SerialBox data={past}/></div>       
          <hr/>
        </div>   

          }) 
        }
       </div>
      )
  }
});



