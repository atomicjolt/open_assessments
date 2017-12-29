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
        assessOffered: false
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

  it('includes the unlock_prev always setting in the embed code', () => {
    props.assessment.assessmentOffered = [{
      unlockPrevious: 'ALWAYS'
    }];
    result = shallow(<EmbedButton {...props} />);
    expect(result.find('#embedInput').html()).toContain('&amp;unlock_prev=ALWAYS');
  });

  it('includes the unlock_prev never setting in the embed code', () => {
    props.assessment.assessmentOffered = [{
      unlockPrevious: 'NEVER'
    }];
    result = shallow(<EmbedButton {...props} />);
    expect(result.find('#embedInput').html()).toContain('&amp;unlock_prev=NEVER');
  });

  it('does not modify the embed code if no unlockPrevious value', () => {
    props.assessment.assessmentOffered = [{
      foo: 'bar'
    }];
    result = shallow(<EmbedButton {...props} />);
    expect(result.find('#embedInput').html()).not.toContain('&amp;unlock_prev');
  });

  it('includes a title attribute in the embed code', () => {
    props.assessment.assessmentOffered = [{
      foo: 'bar'
    }];
    props.assessment.displayName = {
      text: 'test'
    };
    result = shallow(<EmbedButton {...props} />);
    expect(result.find('#embedInput').html()).toContain('title=&quot;test Assessment&quot;');
  });
});
