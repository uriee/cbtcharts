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
              svgStyle: {width: '100%', height: '100%'},
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

                autoStyleContainer: false
              },
              from: {color: '#FFEA82'},
              to: {color: '#ED6A5A'},
              step: (state, bar) => {
                bar.setText(Math.round(bar.value() * 100) + ' %');
                bar.text.style.color = state.color;
              }
           };


        var containerStyle = {
            position: 'relative',
            width: '90%',
            height: '90%',
            margin : '5%'
        };

        return (
            <Line
                progress={this.props.progress}
                options={options}
                initialAnimate={true}
                containerStyle={containerStyle}
                containerClassName={'.progressbar'} />
        );
    }
});

