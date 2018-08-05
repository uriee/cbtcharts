import React from 'react';
import axios from 'axios';
import Pdemand1 from './Pdemand1';
import Pdemand2 from './Pdemand2';
import Porder1 from './Porder1';
import Porder2 from './Porder2';
import Porder3 from './Porder3';
import Serial1 from './Serials1';
import Serial2 from './Serials2';
import Smt1 from './Smt1';
import Smt2 from './Smt2';
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

var Logo = React.createClass({
    render: function() {
        return <div className="img-responsive"><img className="logo" src={require('../public/logo.jpg')} role="presentation" /> </div>
    }
});

var Reactive = React.createClass({
    render: function() {
	if (!this.props.component) return <Empty/>
    else return <this.props.component title={this.props.title} param={this.props.param} script={this.props.script}/>
    }
})

var slides = {'Pdemand1':Pdemand1, 'Pdemand2':Pdemand2, 'Porder1':Porder1, 'Porder3':Porder3,'Porder2':Porder2,
 'Rmain':Rmain , 'Rmaout':Rmaout, 'Rmaday':Rmaday, 'Rmaweek':Rmaweek, 'PorderPie1':PorderPie1,
  'Serial1':Serial1, 'Serial2':Serial2,'Smt1':Smt1,'Smt2':Smt2,  'SmtPie1':SmtPie1,'PurMain':PurMain,
  'FlyTable':FlyTable,  Efficiancy:Efficiancy, SmtCharts:SmtCharts, SelCharts:SelCharts, WavCharts:WavCharts, AqtCharts:AqtCharts, QA:QA}

export default React.createClass({

  getInitialState: function getInitialState() {
    return {
      script: [empty],
      current: 0
    };
  },


  play(){
	var next = (this.state.current === this.state.script.length-1 ? 0 : this.state.current+1)
	//console.log("inplay:",this.state.current,this.state.script)
	this.setState({
	  script: this.state.script,
	  current: next
	});
	setTimeout(() => {this.play(); }, this.state.script[this.state.current].INTERVAL*1000);      
  } ,

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
    /*this.serverRequest.reject;*/
    console.log("unmount:",this)
  },

  render() {
    return (
      <div className='height100'>
      	<div className='height90' > 
          <Logo/> 
  				<Reactive component={slides[this.state.script[this.state.current].NAME]} 
                    script={this.props.route.script} 
                    title={this.state.script[this.state.current].TITLE} 
                    param={this.state.script[this.state.current].PARAM} />  	
     
        </div>

          <Marquee script={this.props.route.script} />

      </div>
  
      )
  }

});

