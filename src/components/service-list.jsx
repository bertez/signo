import React from 'react';

import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

export function ServiceList({ services }) {
  return (
    <section className="ly-services">
      <ul>
        {services.map((service) => {
          return (
            <li key={service.node.fields.slug}>
              <figure>
                <Link to={service.node.fields.slug}>
                  {service.node.frontmatter.picture && (
                    <GatsbyImage
                      image={
                        service.node.frontmatter.picture.childImageSharp
                          .gatsbyImageData
                      }
                      alt={service.node.frontmatter.title}
                    />
                  )}
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
          );
        })}
      </ul>
    </section>
  );
}
