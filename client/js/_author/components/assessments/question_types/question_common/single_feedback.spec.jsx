import React                  from 'react';
import { shallow }            from 'enzyme';
import SingleFeedback         from './single_feedback';
import Editor                 from '../../../common/oea_editor';

describe('single feedback component', () => {
  let props;
  let result;
  let calledFunc;

  beforeEach(() => {
    calledFunc =  false;
    props = {
      updateItem: () => { calledFunc = true; },
      feedbackType: '',
      bankId: '7',
      language: 'eng',
    };
    result = shallow(<SingleFeedback {...props} />);
  });

  it('renders label', () => {
    expect(result.find('label')).toBeDefined();
  });

  it('renders Editor component with props', () => {
    expect(result.find(Editor)).toBeDefined();
  });

  it('calls props.updateItem function', () => {
    expect(calledFunc).toBeFalsy();
    result.instance().updateItem();
    expect(calledFunc).toBeTruthy();
  });
});
