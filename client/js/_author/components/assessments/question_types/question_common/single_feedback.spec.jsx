import React                  from 'react';
import _                      from 'lodash';
import SingleFeedback         from './single_feedback';
import { shallow }            from 'enzyme';
import TestUtils              from 'react-addons-test-utils';
import Editor                 from '../../../common/oea_editor';

describe('single feedback component', () => {
  let props;
  let result;
  let calledFunc;

  beforeEach(() => {
    calledFunc =  false;
    props = {
      updateItem: () => {calledFunc = true},
      feedbackType: '',
      bankId: '7',
    };
    result = shallow(<SingleFeedback {...props} />);
  });

  it('renders label', () => {
    expect(result.find('label')).toBeDefined();
  });

  it('renders Editor component with props', ()=> {
    expect(result.find(Editor)).toBeDefined();
  });

  it('calls props.updateItem function', () => {
    expect(calledFunc).toBeFalsy();
    result.instance().updateItem();
    expect(calledFunc).toBeTruthy();
  });
});
