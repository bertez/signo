import React from 'react';
import snarkdown from 'snarkdown';

export default function Md({ children, Tag = 'p' }) {
  return <Tag dangerouslySetInnerHTML={{ __html: snarkdown(children) }} />;
}
