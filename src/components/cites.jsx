import React from 'react';

import Md from '../helpers/markdown.jsx';

export function Cites({ links }) {
  return (
    <ul>
      {links.map((link) => (
        <li key={link.url}>
          <blockquote>
            <Md>{link.cite}</Md>
            <cite>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                🔗 {link.source} - {link.date}
              </a>
            </cite>
          </blockquote>
        </li>
      ))}
    </ul>
  );
}
