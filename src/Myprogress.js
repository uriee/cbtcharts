import React from 'react'
import {COLORS} from './config.js';
import Progressbar from './Progressbar'

/**
 * This pure presentation class that plots a prograss block.
 * 
 */
export default React.createClass({
  render() {
    return (
      <div >
       <Progressbar progress={50}/>
      </div>
        )
  }
});