import React from 'react';
var ProgressBar = require('react-progressbar.js')
var Line = ProgressBar.Line;

export default React.createClass({
  render() {
        var options = {
            strokeWidth: 1,
            easing: 'easeInOut',
              duration: 1400,
              color: '#FFEA82',
              trailColor: '#eee',
              trailWidth: 1,
              svgStyle: {width: '58%', height: '5%'},
              text: {
                style: {
                  // Text color.
                  // Default: same as stroke color (options.color)
                  color: '#999',
                  position: 'absolute',
                  right: '40px',
                  top: '30px',
                  padding: 10,
                  margin: 10,
                  transform: null
                },
                autoStyleContainer: true
              },
              from: {color: '#FFEA82'},
              to: {color: '#ED6A5A'},
              step: (state, bar) => {
                bar.setText(Math.round(bar.value() * 100) + ' %');
              }
           };


        var containerStyle = {
            width: '200px',
            height: '200px'
        };

        return (
            <Line
                progress={0.9}
                text={'test'}
                options={options}
                initialAnimate={true}
                containerStyle={containerStyle}
                containerClassName={'.progressbar'} />
        );
    }
});

