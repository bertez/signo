import React from 'react';
import Img from 'gatsby-image';

import Slider from './slider.jsx';

export function ClientList({ clients }) {
  return (
    <>
      <Slider
        name="clients"
        settings={{ perPage: { 360: 2, 600: 4, 1200: 6 } }}
      >
        {clients.map(client => (
          <div className="client" key={client.node.fields.slug}>
            <Img
              sizes={client.node.frontmatter.picture.childImageSharp.sizes}
            />
            <h2>{client.node.frontmatter.title}</h2>
          </div>
        ))}
      </Slider>
    </>
  );
}
