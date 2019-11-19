import React from 'react';
import Img from 'gatsby-image';

import Slider from './slider.jsx';

export function ClientList({ clients }) {
  return (
    <>
      <Slider settings={{ loop: true }} name="clients" autoplay>
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
