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

/*
  componentDidMount: function componentDidMount() {
    const TH = this;
    const init = [["Label","Value"]]
    this.serverRequest = axios.get(server + "graph/eff/"+this.props.param).then(function (result) { 
      var d1 = init.concat(result.data.map(x=>[x.LINE, Math.round((x.WTIME / x.TTIME)*100)]))
      var d2 = result.data.map(x=>[x.LINE+'-1H', Math.round((x.WTIME1H / x.TTIME)*100)])
      var data = (TH.props.quant === '1h' ? d1.concat(d2) : d1)
      var d0 = result.data.map(x=>[x.LINE, 0])
      var data0  =init.concat((TH.props.quant === '1h' ? d0.concat(d0) : d0))
      TH.setState({
          data: data0,
        });
      TH.setState({
          data: data,
        })
    });
  },
*/
  componentDidMount: function componentDidMount() {
    const TH = this;
    const init = [["Label","Value"]]
    this.serverRequest = axios.get(server + "graph/eff/"+this.props.param).then(function (result) { 
      var data  = init.concat(result.data.map(x=>{
        var quant = (TH.props.quant === '1h' ? x.WTIME1H : x.WTIME)
        var title = (TH.props.quant === '1h' ? x.LINE+'-1H' : x.LINE)
        var time =  (TH.props.quant === '1h' ? 3600 : x.TTIME)
        return [title, Math.round((quant / time)*100)]
      }))
     /* var data0  = init.concat(result.data.map(x=>[(TH.props.quant === '1h' ? x.LINE+'-1H' : x.LINE), 0]))
      TH.setState({
          data: data0,
        });
        */
      TH.setState({
          data: data,
        })
    });
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



