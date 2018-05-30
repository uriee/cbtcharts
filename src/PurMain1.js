import React from 'react'
import axios from 'axios';
import './App.css';
/*import Myline from './Myline.js';
import Mybar from './Mybar.js';
*/
import {server} from './config.js';
import { Chart } from 'react-google-charts';


const Gauge =  React.createClass({

  render() {

  var w = window.innerWidth/1.2;
  var h = window.innerHeight/3;

var data = this.props.data    
var options = {
                    yellowFrom: -5, yellowTo: 0,
                    redFrom: -25, redTo: -5,
                    greenFrom: 0, greenTo: 25,
                    minorTicks: 5,
                    max:25,
                    min:-25,
                    height: h,
                    width: w,
                    majorTicks: ['-25','0','25'],
                    animation:{
                        duration: 3000,
                        easing: 'inAndOut',
                      }                    
                }

        return (

               <Chart  chartType={"Gauge"}  data={data}  options={options}/>

       );
  }
})

/**
 * A class that plot the main purchase graphs and gauges
 */
export default React.createClass({

  getInitialState: function getInitialState() {
    return {
      data: [],
      groups: []
    };
  },


  componentDidMount: function componentDidMount() {
    const TH = this;
    this.serverRequest = axios.get(server + "graph/pgauge").then(function (result) { 
        const groups = result.data.map(x=>x.NAME)
                TH.setState({
          data: groups.map(x=>[x,0]),
          groups: groups
        })
        const data = result.data.map(x=>{
          x.PERCENT = (100 - Math.round((x.QPRICE / x.COST) * 100))
          return x
        })
        TH.setState({
          data: data,
          groups: groups
        })
    });
    setTimeout(this.componentDidMount.bind(this), 30000);
  },


  componentWillUnmount: function componentWillUnmount() {
    this.serverRequest.reject;
  },

  render() {
    const init = [["Label","Value"]]
    const gdata = init.concat(this.state.data.map(x=>[x.NAME,x.PERCENT]))
    return (
        <div className='height90'>      
          <div className='resp'>
            <div className='center'>  <Gauge data={gdata}/></div> 
          </div>
        </div>
       )
  }

});

/*
          <Myline data={this.state.linedata} title={this.props.title} config={{ X: "X",
              datakeys:this.state.groups }} />   
              */