import React from 'react'
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {COLORS} from './config.js';


export default React.createClass({

  render () {
     console.log("dbg:",this.props.data)

    return (
      <div className='resp'>
        <h3 >{this.props.title}</h3>  
        
      <div className='resp'>   
      <ResponsiveContainer     >
        <LineChart  data={this.props.data} margin={{top: 30, right: 30, left: 10, bottom: 5}}>
          <XAxis dataKey={this.props.config.X}  tickSize={12} />
          <YAxis/>
           <CartesianGrid strokeDasharray="3 6"/>
          <Legend iconSize={30} />
          {this.props.config.datakeys.map(function(dk,index) {
            return <Line key={index} dataKey={dk.name}  fill={COLORS[index]} stroke={COLORS[index]} strokeWidth={5} dot={{  strokeWidth:7 }} />
            })
          }
        </LineChart> 
        </ResponsiveContainer>
      </div>              
      </div>
        )
  }
});

