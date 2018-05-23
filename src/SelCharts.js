import React from 'react'
import Sel1 from './Sel1.js';
import Sel2 from './Sel2.js';
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
          <div className='left51'><Sel1  title='TH Average Performance in 24hr' /></div>
           <div className='left51'><Sel2 title={'TH Output in 24hr'} /></div>
          <div className='gau'><Efficiancy  title='' param='sel'/></div>
        </div>
       )
  }

});

