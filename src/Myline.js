import React from 'react'
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend} from 'recharts';
import {COLORS} from './config.js';

/**
 * This pure presentation class plot a line chart on the screen
 * 
 */

export default React.createClass({

  render () {
    return (
      <div className='resp'>
        <h3 >{this.props.title}</h3>  
        
      <div className='resp'>   
      <ResponsiveContainer     >
        <LineChart  data={this.props.data} margin={{top: 30, right: 30, left: 10, bottom: 5}}>
          <XAxis dataKey={this.props.config.X}  tickSize={5} />
          <YAxis/>
           <CartesianGrid strokeDasharray="3 6"/>
          <Legend iconSize={30} />
          {this.props.config.datakeys.map(function(dk,index) {
            return <Line key={index} dataKey={dk.name}  fill={COLORS[index]} stroke={COLORS[index]} strokeWidth={4} dot={{  strokeWidth:2 }} />
            })
          }
        </LineChart> 
        </ResponsiveContainer>
      </div>              
      </div>
        )
  }
});

