import React from 'react'
import MyTable from './MyTable.js';

export default  (props) => {
    const output = props.props.map(function(p,i,j) { return <MyTable  key={p.key} data={p.table} title={p.title} ukey={i} /> }) 
    return (
      <div dir='ltr' key='tables'>
          {output}
      </div>
      )
  }



