import React from 'react'
import {PieChart, ResponsiveContainer,  Pie, Cell } from 'recharts';
import {COLORS} from './config.js';

const RADIAN = Math.PI / 180;   

/**
 * @name renderActiveShape
 * this function calculate the position of the pie chart labels.
 */
const renderActiveShape = (props) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, 
    fill, payload, percent, index} = props;


  var u = Math.min(cx,cy,1930);
  var r = Math.min(cx/cy,cy/cx,0.75);
  const ex = cx-cx*r*1.4
  const ey = (index+1)*5*cy/50;
  const textAnchor = 'start' ;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.45;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);  

  return (
    <g>
      <text fontSize={u/8} x={ex} y={ey} dy={0} textAnchor={textAnchor} fill={fill}>&#x25A0; </text>
      <text fontSize={u/10}  x={ex+cx/17} y={ey} dy={0} textAnchor={textAnchor} fill="#333">{payload.name}</text>      
      <text style={{display:(percent < 0.03 ? 'none' : 'yes')}} fontSize={u/10} x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'}  dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>      
    </g>
  );
};


/**
 * This pure presentation class plot a pie chart on the screen
 * 
 */
export default React.createClass({

  render() {
      console.log("pieee---:",this.props);    
    return (
      <div className='resp'>    
          <h4 className='center'>{this.props.title}</h4> 
      <div className='resp'>  
          <ResponsiveContainer >  
            <PieChart width={this.props.width} height={this.props.height} >
              <Pie
                data={this.props.data} 
                labelLine={false}
                startAngle={0}          
                label={renderActiveShape}
                paddingAngle={1}    
                fill="#8884d8"
              >
                {
                  this.props.data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
                }
              </Pie>
              </PieChart>
          </ResponsiveContainer>               
          </div>
      </div>        
      )
  }
});
