import React from 'react';

import Md from '../helpers/markdown.jsx';
import { GatsbyImage } from "gatsby-plugin-image";

export function ServiceDetail({ detail }) {
  return <>
    <h2>{detail.title}</h2>

    <figure>
      <GatsbyImage sizes={detail.image.childImageSharp.sizes} />
    </figure>

    <Md>{detail.text}</Md>
  </>;
}
