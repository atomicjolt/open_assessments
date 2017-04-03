import localize         from './localize';

describe('localize', () => {
  let componentProps;
  beforeEach(() => {
    componentProps = {
      myProp: 'im a prop'
    };
  });

  it('injects localized strings into props for a pure function and gets the string based off component name', () => {
    // because I cant stub out the strings,
    // i name this after an actual component that has some strings
    function navigationBarContent(props) {
      const strings = props.localizeStrings();
      return { myProp: props.myProp, myString: strings.new };
    }
    const localizedComponent = localize(navigationBarContent);
    const result = localizedComponent(componentProps);
    expect(result.myProp).toBe('im a prop');
    // dont actually care what the string is because it might change, just that it exists
    expect(result.myString).toBeDefined();
  });

  it('injects the strings into a class via the default props without nuking default props', () => {
    class navigationBarContent {
      static defaultProps = {
        myDefault: 'default'
      }
      render() {}
    }
    const result = localize(navigationBarContent);
    expect(result.defaultProps.myDefault).toBe('default');
    expect(typeof result.defaultProps.localizeStrings).toBe('function');
  });

  it('injects the strings into a class via the default props when there are no default props', () => {
    class navigationBarContent {
      render() {}
    }
    const result = localize(navigationBarContent);
    expect(typeof result.defaultProps.localizeStrings).toBe('function');
  });
});
