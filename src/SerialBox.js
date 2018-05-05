import React from 'react'
import {COLORS} from './config.js';
import './App.css';
import Progress from './ProgressSemiCircle'

/**
 * This pure presentation class that plots a prograss block.
 * 
 */
export default React.createClass({

  render() {
    console.log("BOX-",this.props)
    return (
      <div >
		      <div className = 'left50'>
			      <div><h3>{this.props.data.PARTNAME}</h3></div>
            <div><h3>{this.props.data.SERIALNAME}</h3></div>
            <div><h3>{this.props.data.ACTNAME}</h3></div>
		      </div>
          <div className='left50'>	 <Progress progress={this.props.data.PROGRESS/100}/> </div>
      </div>
    )
  }
});