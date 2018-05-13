import React from 'react'
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
		      <div className='left50'>
			      <div>{this.props.data.PARTNAME}</div>
            <div>{this.props.data.SERIALNAME}</div>
            <div>{this.props.data.ACTNAME}</div>
		      </div>
          <div className='left50'>	 <Progress progress={this.props.data.PROGRESS/100}/> </div>
      </div>
    )
  }
});