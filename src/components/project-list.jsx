import React from 'react';

import { Link } from 'gatsby';
import Img from 'gatsby-image';

export function FeaturedProject({ project, link }) {
  return (
    <>
      <figure className="project-image">
        <Link to={project.fields.slug}>
          <Img sizes={project.frontmatter.picture.childImageSharp.sizes} />
        </Link>
      </figure>
      <section className="project-info">
        <h2>
          <Link to={project.fields.slug}>{project.frontmatter.title}</Link>
        </h2>
        <p className="description">{project.frontmatter.short_description}</p>
        <p className="client">{project.fields.client.frontmatter.title}</p>
        {link && <Link to={project.fields.slug}>Más info</Link>}
      </section>
    </>
  );
}

export function ProjectListBig({ projects }) {
  return (
    <section className="project-list big">
      <ul>
        {projects.map(project => (
          <li className="project" key={project.fields.slug}>
            <FeaturedProject project={project} />
          </li>
        ))}
      </ul>
      <Link to="/proyectos">Más proyectos</Link>
    </section>
  );
}
