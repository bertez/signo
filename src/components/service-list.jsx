import React from 'react';

import { Link } from 'gatsby';
import Img from 'gatsby-image';

export function ServiceList({ services }) {
  return (
    <section className="ly-services">
      <ul>
        {services.map(service => (
          <li key={service.node.fields.slug}>
            <figure>
              <Link to={service.node.fields.slug}>
                <Img
                  sizes={service.node.frontmatter.picture.childImageSharp.sizes}
                />
              </Link>
            </figure>
            <section className="service-info">
              <h3>
                <Link to={service.node.fields.slug}>
                  {service.node.frontmatter.title}
                </Link>
              </h3>
              <p>{service.node.frontmatter.short_description}</p>
            </section>
          </li>
        ))}
      </ul>
    </section>
  );
}
