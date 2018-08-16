import React from 'react';
import axios from 'axios';
import Serial1 from './Serials1';
import Serial2 from './Serials2';
import SmtPie1 from './SmtPie1';
import Rmain from './Rmain';
import Rmaout from './Rmaout';
import Rmaday from './Rmagraph';
import Rmaweek from './Rmagraph2';
import PorderPie1 from './PorderPie1';
import FlyTable from './FlyTable';
import Efficiancy from './Efficiancy';
import SmtCharts from './SmtCharts';
import SelCharts from './SelCharts';
import WavCharts from './WavCharts';
import AqtCharts from './AqtCharts';
import PurMain from './PurMain1.js'
import QA from './QA.js'
import Marquee from './Marquee.js'
import {server} from './config.js';

var Empty = React.createClass({
    render: function() {
        return <div>  </div>
    }
});

var empty = {NAME : Empty , INTERVAL : 1}

var Logo  = () => <div className="img-responsive"><img className="logo" src={require('../public/logo.jpg')} role="presentation" /> </div>

var Reactive  = (props) => {
    if (!props.component) return <Empty/>
    else return <props.component title={props.title} param={props.param} script={props.script} play={props.play}/>
}

var slides = {'Rmain':Rmain , 'Rmaout':Rmaout, 'Rmaday':Rmaday, 'Rmaweek':Rmaweek, 'PorderPie1':PorderPie1,
  'Serial1':Serial1, 'Serial2':Serial2, 'SmtPie1':SmtPie1,'PurMain':PurMain,
  'FlyTable':FlyTable,  Efficiancy:Efficiancy, SmtCharts:SmtCharts, SelCharts:SelCharts, WavCharts:WavCharts, AqtCharts:AqtCharts, QA:QA}

/*----------------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * Definition of the returned Container Class 
 * @name  Container
 */
export default React.createClass({

  getInitialState: function getInitialState() {
    return {
      script: [empty],
      current: 0,
    };
  },

/**
 * A Global variable that holds the timer of the play function;
 * @name  timeout
 */

  timeout : 0,


/**
 * Rotate the current script views .
 * @name  play
 */
  play(){
  clearTimeout( this.timeout )
	var next = (this.state.current === this.state.script.length-1 ? 0 : this.state.current+1)
	this.setState({
	  //script: this.state.script,
	  current: next
	});

  this.timeout = setTimeout(() => {this.play(); }, this.state.script[this.state.current].INTERVAL*1000);      
  } ,

/**
 * Loads the requested script from the database.
 * the function calls itself every 10 minutes in order to corospond to script change 
 * @name  loadscript
 */
  loadScript(){
    var TH = this;
    this.serverRequest = axios.get(server + "script/" + TH.props.route.script).then(function (result) {
    	if (TH.state.script !== result.data){
	        TH.setState({
	          script: result.data,
	          current: 0
	        });
   		}
    });
    setTimeout(() => {this.loadScript(); }, 10*60*1000)
   },


  componentDidMount: function componentDidMount() {
    var TH = this;
    this.serverRequest = axios.get(server + "script/" + TH.props.route.script).then(function (result) {
        TH.setState({
          script: result.data,
          current: 0
        });
    	TH.play();
    	setTimeout(() => {TH.loadScript(); }, 10*60*1000)
    });
   },


  componentWillUnmount: function componentWillUnmount() {
  },

  render() {
    return (
      <div className='height100'>
      	<div className='height90' > 
          <Logo/> 
  				<Reactive component={slides[this.state.script[this.state.current].NAME]} 
                    script={this.props.route.script} 
                    play={this.play}
                    title={this.state.script[this.state.current].TITLE} 
                    param={this.state.script[this.state.current].PARAM} />  	
     
        </div>

          <Marquee script={this.props.route.script} />

      </div>
  
      )
  }

});

