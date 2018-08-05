import React from 'react'
import createReactClass from 'create-react-class';
import MyTable from './MyTable.js';



export default  createReactClass({
  render() {
    return (
      <div dir='ltr' >
          {this.props.props.map(function(p,i,j) {
            return <MyTable  key={p.dlink} dlink={p.dlink} title={p.title} ukey={i} />
            })
          }
      </div>
      )
  }
});


