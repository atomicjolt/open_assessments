import React          from 'react';
import { shallow }    from 'enzyme';
import TinyWrapper    from './tiny_wrapper';

describe('tiny_wrapper component', () => {
  let props;
  let result;

  beforeEach(() => {
    props = {
      text: 'Spec 1, 2, 3',
      editorKey: 'The key to success',
      onBlur: () => {},
      onFocus: () => {},
      openModal: () => {},
      onChange: () => {},
    };
    result = shallow(<TinyWrapper {...props} />);
  });

  it('renders component', () => {
    expect(result.find('label').length).toBe(1);
  });
});
