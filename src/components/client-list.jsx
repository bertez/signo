import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

export function ClientList({ clients }) {
  return (
    <>
      <ul>
        {clients.map((client) => (
          <li className="client" key={client.node.fields.slug}>
            <GatsbyImage
              alt={client.node.frontmatter.title}
              image={
                client.node.frontmatter.picture.childImageSharp.gatsbyImageData
              }
            />
            {/* <h2>{client.node.frontmatter.title}</h2> */}
          </li>
        ))}
      </ul>
    </>
  );
}
