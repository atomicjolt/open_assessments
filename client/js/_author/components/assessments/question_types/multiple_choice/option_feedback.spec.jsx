import React              from 'react';
import { shallow }        from 'enzyme';
import Editor             from '../../../common/oea_editor';
import OptionFeedback     from './option_feedback';

describe('option feedback component', () => {
  let props;
  let result;
  let calledFunc;

  beforeEach(() => {
    calledFunc =  false;
    props = {
      updateChoice: () => { calledFunc = true; },
      bankId: '7',
      feedback: '',
      id: '',
      hidden: false,
      fileIds: {},
      language: 'eng',
    };
    result = shallow(<OptionFeedback {...props} />);
  });

  it('renders label', () => {
    expect(result.find('label')).toBeDefined();
  });

  it('renders Editor component with props', () => {
    expect(result.find(Editor)).toBeDefined();
  });

  it('calls props.updateChoice function', () => {
    expect(calledFunc).toBeFalsy();
    result.instance().props.updateChoice();
    expect(calledFunc).toBeTruthy();
  });

  it('renders a is-hidden class when hidden is true', () => {
    props.hidden = true;
    result = shallow(<OptionFeedback {...props} />);
    expect(result.find('.is-hidden').length).toBe(1);
  });
});
