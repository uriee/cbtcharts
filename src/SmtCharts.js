import React from 'react'
import Smt1 from './Smt1.js';
import WeeklyProd from './WeeklyProd.js';
import Efficiancy from './Efficiancy.js'

/**
 * A function that plots a combination of the SMT graphs
 */
export default () =>
  {
    return (
        <div className='height90'>      
          <div className='left51'><Smt1  title='SMT Average Performance in 24hr' /></div>
           <div className='left51'><WeeklyProd title='SMT Weekly Production' param='smt' /></div>
          <div className='gau'><Efficiancy  title='' param='smt'/></div>
          <div className='gau2'><Efficiancy  title='' param='smt' quant='1h' /></div>           
        </div>
       )
  }



