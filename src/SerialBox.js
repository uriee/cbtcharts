import React from 'react'
import './App.css';
import Progress from './ProgressSemiCircle'

/**
 * This pure presentation class that plots a prograss block.
 * 
 */
export default React.createClass({

  render() {
    return (
      <div >
		      <div className='left50'>
			      <div>{this.props.data.PARTNAME}</div>
            <div>{this.props.data.SERIALNAME}</div>
            <div>{this.props.data.ACTNAME}</div>
		      </div>
          <div className='left50'>	 {this.props.data.PROGRESS ? <Progress progress={this.props.data.PROGRESS/100}/> : <span/>} </div>
      </div>
    )
  }
});