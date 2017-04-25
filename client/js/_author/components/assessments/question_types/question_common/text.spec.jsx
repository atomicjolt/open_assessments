import React              from 'react';
import { shallow }        from 'enzyme';
import QuestionText       from './text';
import Editor             from '../../../common/oea_editor';

describe('text component', () => {
  let props;
  let result;

  beforeEach(() => {
    props = {
      itemId: '7',
      updateItem: () => {},
      bankId: '',
    };
    result = shallow(<QuestionText {...props} />);
  });

  it('renders question text label', () => {
    const input = result.find('label');
    expect(input).toBeDefined();
  });

  it('renders the Editor component', () => {
    expect(result.find(Editor).props()).toBeDefined();
  });
});
