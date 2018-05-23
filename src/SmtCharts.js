import React from 'react'
import Smt1 from './Smt1.js';
import Smt2 from './Smt2.js';

/**
 * A class that plot acombunation of the SMT graphs
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
          <div className='left50'><Smt1  title='SMT Average Performance in 24hr' /></div>
           <div className='left50'><Smt2 title={'SMT Output in 24hr'} /></div>
        </div>
       )
  }

});

