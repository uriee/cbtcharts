import React from 'react'
import axios from 'axios';
import './App.css';
import {server} from './config.js';
import Gauge from './Gauge.js';



/**
 * A class that plot the state of the current efficiancies of the different lines
 */
export default React.createClass({


  getInitialState: function getInitialState() {
    return {
     data: [['Label', 'Value']],
     lines: []
    };
  },


  componentDidMount: async function componentDidMount() {
    const TH = this;
    const init = [["Label","Value"]]
    const result = await axios.get(server + "graph/eff/"+this.props.param)
    const data  = init.concat(result.data.map(x=>{
    const quant = (TH.props.quant === '1h' ? x.WTIME1H : x.WTIME)
    const title = (TH.props.quant === '1h' ? x.LINE+'-1H' : x.LINE)
    const time =  (TH.props.quant === '1h' ? 3600 : x.TTIME)
        return [title, Math.round((quant / time)*100)]
      }))

    TH.setState({
      data: data,
    })
    
  },

  render() {
    return (
    <div className='resp'>
          <h2 >{this.props.title}</h2>
          <div className='center'>  <Gauge data={this.state.data}/></div> 
     </div>
   )
  }
});



