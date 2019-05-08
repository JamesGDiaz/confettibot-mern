import React, { Component } from "react";
import styles from "./confettianimation.module.scss";
var NUM_CONFETTI = 200;
const COLORS = [
  [85, 71, 106],
  [174, 61, 99],
  [219, 56, 83],
  [244, 92, 68],
  [248, 182, 70]
];
const PI_2 = 2 * Math.PI;

const range = (a, b) => (b - a) * Math.random() + a;

var isMobile = {
  Android: function() {
    return navigator.userAgent.match(/Android/i);
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
    return isMobile.Android() || isMobile.iOS() || isMobile.Windows();
  }
};

class Confetti extends Component {
  constructor(props) {
    super(props);

    this.context = this.props.context;
    this.style = COLORS[~~range(0, 5)];
    this.rgb = `rgba(${this.style[0]},${this.style[1]},${this.style[2]}`;
    this.r = ~~range(3, 7);
    this.r2 = 2 * this.r;
    this.w = this.props.w;
    this.h = this.props.h;
    this.replace();
  }

  replace() {
    this.opacity = 0;
    this.dop = 0.01 * range(1, 4);
    this.x = range(-this.r2, this.w - this.r2);
    this.y = range(-20, this.h - this.r2);
    this.xmax = this.w - this.r;
    this.ymax = this.h - this.r;
    this.vx = range(-0.5, 0.5);
    this.vy = 0.2 * this.r + range(0.1, 1);
  }

  drawCircle = function(x, y, r, style) {
    this.context.beginPath();
    this.context.arc(x, y, r, 0, PI_2, false);
    this.context.fillStyle = style;
    this.context.shadowBlur = 6;
    this.context.shadowColor = style;
    this.context.fill();
  };

  draw() {
    this.x += this.vx;
    this.y += this.vy;
    this.opacity += this.dop;
    if (this.opacity > 1) {
      this.opacity = 1;
      this.dop *= -1;
    }
    if (this.opacity < 0 || this.y > this.ymax) {
      this.replace();
    }
    if (!(0 < this.x && this.x < this.xmax)) {
      this.x = (this.x + this.xmax) % this.xmax;
    }
    return this.drawCircle(
      ~~this.x,
      ~~this.y,
      this.r,
      `${this.rgb},${this.opacity})`
    );
  }
}

class ConfettiAnimation extends Component {
  constructor() {
    super();
    if (isMobile.any()) NUM_CONFETTI = 80;
    this.canvas = React.createRef();
    this.context = null;
    this.w = 0;
    this.h = 0;
    this.confetti = [];
    window.requestAnimationFrame = (() =>
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      (callback => setTimeout(callback, 1000 / 60)))();
    window.cancelAnimationFrame =
      window.cancelAnimationFrame || window.mozCancelAnimationFrame;
  }

  __range__(start, end) {
    let range = [];
    for (let i = start; i < end; i++) {
      range.push(i);
    }
    return range;
  }

  resizeWindow = () => {
    this.w = this.canvas.current.width = window.innerWidth;
    this.h = this.canvas.current.height = window.innerHeight;
  };

  step = () => {
    this.context = this.canvas.current.getContext("2d");
    window.requestAnimationFrame(this.step);
    this.context.clearRect(0, 0, this.w, this.h);
    return Array.from(this.confetti).map(c => c.draw());
  };

  componentWillUpdate() {
    this.context = this.canvas.current.getContext("2d");
    this.resizeWindow();
    this.confetti = this.__range__(1, NUM_CONFETTI).map(
      i => new Confetti({ context: this.context, w: this.w, h: this.h })
    );
  }

  componentDidMount() {
    this.context = this.canvas.current.getContext("2d");
    this.resizeWindow();
    this.confetti = this.__range__(1, NUM_CONFETTI).map(
      i => new Confetti({ context: this.context, w: this.w, h: this.h })
    );
    this.step();
  }

  componentWillUnmount() {
    window.cancelAnimationFrame();
  }

  render() {
    return <canvas ref={this.canvas} className={styles.canvas} />;
  }
}

export default ConfettiAnimation;
