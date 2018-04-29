import React from 'react'
import {ResponsiveContainer, BarChart,  Bar, XAxis, YAxis, Legend} from 'recharts';
import {COLORS} from './config.js';

/**
 * This pure presentation class plot a stacked bar on the screen
 * 
 */
export default React.createClass({
  render() {
    return (
      <div className='resp'>
        <h3 >{this.props.title}</h3>  
        
      <div className='resp'>   
      <ResponsiveContainer     >
        <BarChart  data={this.props.data} margin={{top: 30, right: 10, left: 15, bottom: 25}}>
          <XAxis dataKey={this.props.config.X}/>
          <YAxis/>
          <Legend iconSize={20}/>
          {this.props.config.datakeys.map(function(dk,index) {
              return <Bar key={index} dataKey={dk.name} stackId={dk.stack} fill={COLORS[index]} label={{ fill: COLORS[index], fontSize: 20 }} />
            })
          }
        </BarChart> 
        </ResponsiveContainer>
      </div>              
      </div>
        )
  }
});


