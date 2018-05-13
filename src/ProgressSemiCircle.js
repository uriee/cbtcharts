import React from 'react';
var ProgressBar = require('react-progressbar.js')
var SemiCircle = ProgressBar.Line;

export default React.createClass({
  render() {
        var options = {
          strokeWidth: 6,
          color: '#FFEA82',
          trailColor: '#eee',
          trailWidth: 1,
          easing: 'easeInOut',
          duration: 1400,
          svgStyle: null,
          text: {
            value: '',
            alignToBottom: true,
            style: {
             'font-size': '150%' ,     
              'margin-top' : '1%'
            }
          },  
          from: {color: '#ED6A5A'},/*'#FFEA82'*/
          to: {color: '#6AAD5A'},
          // Set default step function for all animate calls
          step: (state, bar) => {
            bar.path.setAttribute('stroke', state.color);
            var value = Math.round(bar.value() * 100);
            if (value === 0) {
              bar.setText('');
            } else {
              bar.setText(value+'%');
            }

            bar.text.style.color = state.color;
            bar.text.style.textSize = 100;
          }
        }


        var containerStyle = {
           width: '60%',
       };
        console.log("gg",this.props)
        return (
            <SemiCircle
                progress={this.props.progress}
                text={'test'}
                options={options}
                initialAnimate={true}
                containerStyle={containerStyle}
                containerClassName={'.semi-circle'} />
        );
    }
});

