import _                from 'lodash';
import localizedStrings from './locales';

export default function localize(component, narrow = true) {
  function strings(key) {
    return narrow ? localizedStrings[key || _.camelCase(component.name)] || {} : localizedStrings;
  }

  if (component.prototype.render) {
    component.defaultProps = { localizeStrings: strings, ...component.defaultProps }; //eslint-disable-line
    return component;
  }
  function newComponent(props) {
    return component({ localizeStrings: strings, ...props });
  }

  // this is weird but makes react's message say the correct name instead of
  // proptype error in newComponent
  Object.defineProperty(newComponent, 'name', { value: component.name });
  return newComponent;
}
