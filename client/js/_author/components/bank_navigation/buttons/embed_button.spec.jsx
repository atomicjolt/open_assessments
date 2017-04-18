import React             from 'react';
import { shallow }       from 'enzyme';
import EmbedButton       from './embed_button';

describe('embed_button component', () => {
  let props;
  let result;
  let focused;

  beforeEach(() => {
    focused = false;
    props = {
      assessment: {
        isPublished: true,
        assessOffered: false,
      },
      getEmbedCode: () => {},
      onFocus: () => { focused = true; },
      baseEmbedUrl: '',
    };
    result = shallow(<EmbedButton {...props} />);
  });

  it('matches the snapshot', () => {
    expect(result).toMatchSnapshot();
  });

  it('handles the onFocus function', () => {
    expect(focused).toBeFalsy();
    result.find('button').simulate('focus');
    expect(focused).toBeTruthy();
  });

  it('renders an input when assessOffered', () => {
    props.assessment.assessOffered = true;
    result = shallow(<EmbedButton {...props} />);
    expect(result.find('input')).toBeDefined();
  });
});
