"use strict";

import en     from './en';
import it     from './it';
import te     from './te';
import hi     from './hi';

export default () => {
  return {...en, ...it, ...te, ...hi};
};
