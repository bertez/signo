import React from 'react';
import MainWrapper from './src/wrappers/main';

export const wrapPageElement = ({ element, props }) => {
  return <MainWrapper {...props}>{element}</MainWrapper>;
};
