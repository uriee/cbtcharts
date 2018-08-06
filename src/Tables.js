import React from 'react'
import MyTable from './MyTable.js';

export default  (props) => {
  console.log('PROPS:',props)
    const output = props.props.map(function(p,i,j) { return <MyTable  key={p.dlink} dlink={p.dlink} title={p.title} ukey={i} /> }) 
    return (
      <div dir='ltr' >
          {output}
      </div>
      )
  }



