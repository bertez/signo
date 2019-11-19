import React from 'react';
import Img from 'gatsby-image';

export function ClientList({ clients }) {
  return (
    <section className="client-list">
      <ul>
        {clients.map(client => (
          <li key={client.node.fields.slug}>
            <Img
              sizes={client.node.frontmatter.picture.childImageSharp.sizes}
            />
            <h2>{client.node.frontmatter.title}</h2>
          </li>
        ))}
      </ul>
    </section>
  );
}
