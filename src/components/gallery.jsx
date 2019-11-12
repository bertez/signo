import React, { Component } from 'react';

import Img from 'gatsby-image';
import { Link } from 'gatsby';
export class Gallery extends Component {
  render() {
    const { images } = this.props;
    return (
      <ul>
        {images.map(i => (
          <li key={i.image.childImageSharp.thumb.src}>
            <a href={i.image.childImageSharp.big.src}>
              <Img resolutions={i.image.childImageSharp.thumb} alt={i.title} />
            </a>
          </li>
        ))}
      </ul>
    );
  }
}
