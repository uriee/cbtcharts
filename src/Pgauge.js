import React from 'react'
import axios from 'axios';
import './App.css';
import {server} from './config.js';
import { Chart } from 'react-google-charts';


/**
 * A class that plot the purchase gauges.
 */
const Gauge = (props) => {
  var w = window.innerWidth/1.2;
  var h = window.innerHeight/3;
  var data = props.data    
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

       )
}

/**
 * A class that plot the purchase gauges.
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


  render() {
    const init = [["Label","Value"]]
    const gdata = init.concat(this.state.data.map(x=>[x.NAME,x.PERCENT]))

    return (
    
               <Gauge data={gdata}/>
       )
  }

});

