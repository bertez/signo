import React, { Component } from 'react';
import Siema from 'siema';

export default class Slider extends Component {
  componentDidMount() {
    const { name, autoplay } = this.props;
    const settings = {
      selector: `.signo-slider-${name}`,
      perPage: {
        480: 2,
        800: 3,
        1200: 4
      },
      ...this.props.settings
    };

    this.siema = new Siema(settings);

    if (autoplay) {
      setInterval(() => {
        this.siema.next();
      }, this.intervalDelay || 5000);
    }
  }

  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
  }

  render() {
    const { children, name } = this.props;

    return <div className={`signo-slider-${name}`}>{children}</div>;
  }
}
