import React            from 'react';
import { shallow }      from 'enzyme';
import AnswerIcons      from './answer_icons';

describe('Correct answer selector', () => {
  let result;
  let props;
  let funcResult;

  beforeEach(() => {
    funcResult = null;
    props = {
      first: false,
      last: false,
      moveUp: () => { funcResult = 'moveUp'; },
      moveDown: () => { funcResult = 'moveDown'; },
      shuffle: false,
      deleteChoice: () => { funcResult = 'deleteChoice'; },
    };
    result = shallow(<AnswerIcons {...props} />);
  });

  it('Hides arrows if shuffle', () => {
    props.shuffle = true;
    result = shallow(<AnswerIcons {...props} />);
    const buttons = result.find('button');
    expect(buttons.length).toBe(1);
  });

  it('moves option up', () => {
    const buttons = result.find('button');
    buttons.at(0).simulate('click', { target: { innerText: buttons.at(0).text() } });
    expect(funcResult).toBe('moveUp');
  });

  it('moves option down', () => {
    const buttons = result.find('button');
    buttons.at(1).simulate('click', { target: { innerText: buttons.at(1).text() } });
    expect(funcResult).toBe('moveDown');
  });

  it('deletes option', () => {
    const buttons = result.find('button');
    buttons.at(2).simulate('click', { target: { innerText: buttons.at(2).text() } });
    expect(funcResult).toBe('deleteChoice');
  });

});
