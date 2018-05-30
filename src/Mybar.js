import React from 'react'
import {ResponsiveContainer, BarChart,  Bar, XAxis, YAxis, Legend} from 'recharts';
import {COLORS} from './config.js';

const BarLabel = (props) => {
    const {
        payload,
        textAnchor,
        fill,
        x,
        y,
        width,
        height,
        value
    } = props;
    if (value[1] > 0) {
        return (
            <text
                
                textAnchor={textAnchor}
                fill={fill}
                x={x}
                y={y}
                width={width}
                height={height}
                >
                {value[1]}
            </text>
        );
    } else {
        return <text></text>;
    }
};


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
              return <Bar key={index} dataKey={dk.name} stackId={dk.stack} fill={COLORS[index]} label={<BarLabel/>} / >
            })
          }
        </BarChart> 
        </ResponsiveContainer>
      </div>              
      </div>
        )
  }
});


