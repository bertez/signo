import React from 'react';

import Md from '../helpers/markdown.jsx';
import Img from 'gatsby-image';

function TextSection({ section }) {
  return (
    <>
      <h2>{section.title}</h2>
      <Md>{section.text}</Md>
    </>
  );
}

function ImageSection({ section }) {
  return (
    <>
      <figure>
        <Img sizes={section.image.childImageSharp.sizes} />
      </figure>
      {section.text && <Md>{section.text}</Md>}
    </>
  );
}

function VideoSection({ section }) {
  return (
    <>
      <iframe
        src={`https://www.youtube.com/embed/${section.video}`}
        frameborder="0"
        allowfullscreen
        title={section.text}
      ></iframe>
      {section.text && <Md>{section.text}</Md>}
    </>
  );
}

export function ProjectSection({ section }) {
  switch (section.type) {
    case 'text':
      return <TextSection section={section} />;
    case 'video':
      return <VideoSection section={section} />;
    case 'image':
      return <ImageSection section={section} />;
    default:
      return null;
  }
}
