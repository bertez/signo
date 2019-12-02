import React from 'react';

import { Link } from 'gatsby';
import Img from 'gatsby-image';

export const FeaturedProject = React.memo(function FeaturedProject({
  project,
  link,
  size = 'big',
  description
}) {
  return (
    <>
      <figure className="project-image">
        <Link to={project.fields.slug}>
          <Img sizes={project.frontmatter.picture.childImageSharp[size]} />
        </Link>
      </figure>
      <section className="project-info">
        <h2>
          <Link to={project.fields.slug}>{project.frontmatter.title}</Link>
        </h2>
        <p className="client">
          {project.frontmatter.related_client.frontmatter.title}
        </p>
        {description && (
          <p className="description">{project.frontmatter.short_description}</p>
        )}
        {link && (
          <Link to={project.fields.slug} className="link">
            Más info
          </Link>
        )}
      </section>
    </>
  );
});

export const ProjectList = React.memo(function ProjectList({
  projects,
  more = false,
  link = false,
  description = true,
  size = 'big'
}) {
  return (
    <>
      <ul>
        {projects.map(project => (
          <li className="project" key={project.fields.slug}>
            <FeaturedProject
              project={project}
              link={link}
              size={size}
              description={description}
            />
          </li>
        ))}
      </ul>
      {more && <Link to="/proyectos">Más proyectos</Link>}
    </>
  );
});
