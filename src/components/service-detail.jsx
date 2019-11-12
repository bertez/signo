import React from 'react';

import Md from '../helpers/markdown.jsx';
import Img from 'gatsby-image';

export function ServiceDetail({ detail }) {
  return (
    <>
      <h2>{detail.title}</h2>

      <figure>
        <Img resolutions={detail.image.childImageSharp.resolutions} />
      </figure>

      <Md>{detail.text}</Md>
    </>
  );
}
