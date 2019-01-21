import React from 'react'
import Prod1 from './Prod1.js';
import Prod2 from './Prod2.js';
import Efficiancy from './Efficiancy.js'
/**
 * A class that plot acombunation of the TH graphs
 */
export default (props) => {
    return (
        <div className='height90'>      
          <div className='left51'><Prod1  title='Integration Average Performance in 24hr' type='i'/></div>
           <div className='left51'><Prod2 title={'Integration Output in 24hr'} type='i' /></div>
          <div className='gau'><Efficiancy  title='' param='int'/></div>
          <div className='gau2'><Efficiancy  title='' param='int' quant='1h' /></div>
        </div>
       )
  }



