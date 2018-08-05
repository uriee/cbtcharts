import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const FPS = 70;
const STEP = 1;
const TIMEOUT = 1 / FPS * 1000;
var width = document.getElementById('root').offsetWidth;


class Marquee extends Component {
  constructor(props) {
    super(props)
    this.state = {
      animatedWidth: 0,
      overflowWidth: 0
    }

    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  componentDidMount() {
    this._measureText();

    if (this.props.hoverToStop) {
      this._startAnimation();
    }
  }

  componentDidUpdate() {
    this._measureText();

    if (this.props.hoverToStop) {
      this._startAnimation();
    }
  }

  componentWillUnmount() {
    clearTimeout(this._marqueeTimer);
  }

  componentWillReceiveProps(nextProps) {
          if(this.props.text.length != nextProps.text.length)
          {
              clearTimeout(this._marqueeTimer);
              this.setState({
                animatedWidth: 0
              });
          }
  }

  handleMouseEnter() {
    if (this.props.hoverToStop) {
      clearTimeout(this._marqueeTimer);
    }
    else if (this.state.overflowWidth > 0){
      this._startAnimation();
    }
  }

  handleMouseLeave() {
    if (this.props.hoverToStop && this.state.overflowWidth > 0) {
      this._startAnimation();
    }
    else {
      clearTimeout(this._marqueeTimer);
      this.setState({
        animatedWidth: 0
      });
    }
  }

  render() {
    const style = {
      'position': 'fixed',
      'left': this.state.animatedWidth,
      'buttom' : 0,
      'whiteSpace': 'nowrap',
      'fontSize': '35px',
    };

    if (this.state.overflowWidth < 0) {
      return (
        <div className={`ui-marquee ${this.props.className}`} style={{overflow: 'hidden'}}>
          <span ref="text" style={style} title={this.props.text}>{this.props.text}</span>
        </div>
      );
    }
    else {
      return (
        <div className={`ui-marquee ${this.props.className}`} style={{overflow: 'hidden'}}
             onMouseEnter={this.handleMouseEnter}
             onMouseLeave={this.handleMouseLeave}>
          <span ref="text" style={style} title={this.props.text}>{this.props.text}</span>
        </div>
      );
    }
  }

  _startAnimation() {
    clearTimeout(this._marqueeTimer);
    const isLeading = this.state.animatedWidth === 0;
    const timeout = isLeading ? this.props.leading : TIMEOUT;

    const animate = () => {
      const {overflowWidth} = this.state;
      let animatedWidth = this.state.animatedWidth + STEP;
      const isRoundOver = animatedWidth > overflowWidth;
      const node = ReactDOM.findDOMNode(this.refs.text).offsetWidth;

      if (isRoundOver) {
        if (this.props.loop) {
          animatedWidth =  -node;
        }
        else {
          return;
        }
      }

      if (isRoundOver && this.props.trailing) {
        this._marqueeTimer = setTimeout(() => {
          this.setState({
            animatedWidth 
          });

          this._marqueeTimer = setTimeout(animate, TIMEOUT);
        }, this.props.trailing);
      }
      else {
        this.setState({
          animatedWidth
        });

        this._marqueeTimer = setTimeout(animate, TIMEOUT);
      }
    };

    this._marqueeTimer = setTimeout(animate, timeout);
  }

  _measureText() {
    const container = ReactDOM.findDOMNode(this);
    const node = ReactDOM.findDOMNode(this.refs.text);
    
    if (container && node) {
      const containerWidth = container.offsetWidth;
      const textWidth = node.offsetWidth;
      const overflowWidth = containerWidth ;

      if (overflowWidth !== this.state.overflowWidth) {
        this.setState({
          overflowWidth
        });
      }
    }
  }
}

Marquee.defaultProps = {
  text: '',
  hoverToStop: false,
  loop: false,
  leading: 0,
  trailing: 1000
}

Marquee.propTypes = {
  text: PropTypes.string,
  hoverToStop: PropTypes.bool,
  loop: PropTypes.bool,
  leading: PropTypes.number,
  trailing: PropTypes.number,
  className: PropTypes.string
}

module.exports = Marquee;