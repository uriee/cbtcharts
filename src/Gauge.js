import React from 'react';

//var Gauge = require('react-canvas-gauges')
import { Chart } from 'react-google-charts';




export default React.createClass({

  render() {

  var w = window.innerWidth/1.2;
  var h = window.innerHeight/3;

var data = this.props.data    
var options = {
                    yellowFrom: 50, yellowTo: 80,
                    redFrom: 0, redTo: 50,
                    greenFrom: 80, greenTo: 120,
                    minorTicks: 5,
                    max:200,
                    height: h,
                    width: w,
                    majorTicks: ['0','100','200'],
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

/*          
           title={this.props.title}
           height='300%'
           value={this.props.value}
           minValue={0}
           highlights={ [
                  { from: 0, to: 50, color: 'rgba(255,30,0,.25)' },
                  { from: 50, to: 75, color: 'rgba(255,255,0,.15)' },
                  { from: 75, to: 100, color: 'rgba(0,255,0,.15)' },
              ]}           
           maxValue={200}
           majorTicks={['0', '50',  '100',  '150', '200']}
           minorTicks={2}
           colorNumbers='#BBB'
        ></RadialGauge>
*/
