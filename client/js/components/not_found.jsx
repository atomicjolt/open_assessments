"use strict";

import React            from 'react';
import LocalizedStrings from 'react-localization';
import locales          from '../locales/locales';

export default class NotFound extends React.Component{
  render(){
    var strings = new LocalizedStrings(locales());
    return <h2>strings.notFound.notFound</h2>;
  }
};
module.export = NotFound;
