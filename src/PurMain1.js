import React from 'react'
import G1 from './Pdemand1.js';
import G2 from './Pdemand2.js';
import Gauge from './Pgauge.js';

/**
 * A class that plot the purchase gauges.
 */
export default  (props) => {

    return (
        <div className='height90'>      
          <div className='left51'>
            <G1 title='Demands Per Buyer/Status (last MRP run)' />
          </div>
          <div className='left51' >      
           <G2 title='Aging Demands' />
          </div>
          <div className='left50'>      
               <Gauge />
          </div>
        </div>
       )

};

