import React, { Component } from "react";
import Siema from "siema";

export default class Slider extends Component {
  componentDidMount() {
    const { name, autoplay } = this.props;
    const settings = {
      selector: `.signo-slider-${name}`,
      perPage: {
        480: 3,
        800: 4,
        1200: 6,
      },
      ...this.props.settings,
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
    const { children, name, arrows } = this.props;

    return (
      <div className="ly-slider-wrapper">
        {arrows && (
          <div className="arrows">
            <button onClick={() => this.siema.prev()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
              </svg>
            </button>
            <button onClick={() => this.siema.next()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
              </svg>
            </button>
          </div>
        )}
        <div className={`signo-slider-${name}`}>{children}</div>
      </div>
    );
  }
}
