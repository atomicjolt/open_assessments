import localizedStrings from './locales';


export default function localize(component, narrow = true) {
  function strings() {
    return narrow ? localizedStrings[component.name] : localizedStrings;
  }

  if (component.prototype.render) {
    component.defaultProps = { localizeStrings: strings, ...component.defaultProps }; //eslint-disable-line
    return component;
  }
  return props => component({ localizeStrings: strings, ...props });
}
