import React            from 'react';
import LocalizedStrings from 'react-localization';
import locales          from '../../locales/locales';

export default class RetriesExceeded extends React.Component{
  render() {
    var strings = new LocalizedStrings(locales());
    return <div>strings.retriesExceeded.triesExceeded</div>;
  }
}
