import React from 'react'
import Prod1 from './Prod1.js';
import Prod2 from './Prod2.js';
import Efficiancy from './Efficiancy.js'
/**
 * A class that plot acombunation of the TH graphs
 */
export default React.createClass({

  getInitialState: function getInitialState() {
    return {

    };
  },


  componentDidMount: function componentDidMount() {

  },


  componentWillUnmount: function componentWillUnmount() {

  },

  render() {
    console.log("debug:",this.props)
    return (
        <div className='height90'>      
          <div className='left51'><Prod1  title='WAVE Average Performance in 24hr' type='W'/></div>
           <div className='left51'><Prod2 title={'WAVE Output in 24hr'} type='W' /></div>
          <div className='gau'><Efficiancy  title='' param='wav'/></div>
        </div>
       )
  }

});

