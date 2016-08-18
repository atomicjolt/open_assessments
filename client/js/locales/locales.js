"use strict";

import en     from './en';
import he     from './he';
import hi     from './hi';
import it     from './it';
import te     from './te';

export default () => {
  return {
      ...en,
      ...he,
      ...hi,
      ...it,
      ...te
  };
};
