import React from 'react';

var Gauge = require('react-canvas-gauges')
var RadialGauge = Gauge.RadialGauge




export default React.createClass({
  render() {
        return (

          <RadialGauge
           title={this.props.title}
           height='400%'
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

       );
  }
})


