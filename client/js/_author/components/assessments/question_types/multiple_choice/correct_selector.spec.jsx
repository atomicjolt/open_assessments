import React            from 'react';
import { shallow }      from 'enzyme';
import CorrectSelector  from './correct_selector';

describe('Correct answer selector', () => {
  let result;
  let props;

  beforeEach(() => {
    props = {
      itemType: '',
      id: 'TacoId',
      isCorrect: true,
      updateChoice: () => {},
    };
    result = shallow(<CorrectSelector {...props} />);
  });

  it('checks if input.checked is true', () => {
    expect(result.find('optionRadio').props().isCorrect).toBeTruthy();
  });

});
