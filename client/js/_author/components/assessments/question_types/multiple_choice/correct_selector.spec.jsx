import React            from 'react';
import { shallow }      from 'enzyme';
import CorrectSelector  from './correct_selector';
import Radio            from '../question_common/option_radio';

describe('Correct answer selector', () => {
  let result;
  let props;

  beforeEach(() => {
    props = {
      itemType: 'TypeOfItem',
      itemId: '',
      id: 'TacoId',
      isCorrect: true,
      updateChoice: () => {},
    };
    result = shallow(<CorrectSelector {...props} />);
  });

  it('checks if input.checked is true', () => {
    expect(result.find(Radio).props().isCorrect).toBeTruthy();
  });

});
