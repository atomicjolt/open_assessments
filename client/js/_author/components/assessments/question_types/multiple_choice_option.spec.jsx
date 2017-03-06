import React        from 'react';
import TestUtils    from 'react-addons-test-utils';
import { shallow }  from 'enzyme';
import OeaEditor    from '../../common/oea_editor';
import Stub         from '../../../../../specs_support/stub';
import Option       from './multiple_choice_option';

describe('Multiple Choice Option', () => {
  let result;
  let props;
  let updatedChoice = {};
  let moveChoice = '';

  beforeEach(() => {
    props = {
      isCorrect: true,
      key: 'assessmentChoice_1',
      updateChoice: attr =>  { updatedChoice = attr; },
      text: 'This is dummy text',
      deleteChoice: (e) => { moveChoice = e.target.innerText; },
      shuffle: false,
      moveUp: (e) => { moveChoice = e.target.innerText; },
      moveDown: (e) => { moveChoice = e.target.innerText; },
      isActive: true,
    };
    result = shallow(<Option {...props} />);
  });

  it('checks if input.checked is true', () => {
    expect(result.find('optionRadio').props().isCorrect).toBeTruthy();
  });

  it('clicks the first input', () => {
    expect(updatedChoice.isCorrect).toBe(undefined);
    result.find('optionRadio').props().updateChoice({ isCorrect: true });
    expect(updatedChoice.isCorrect).toBe(true);
  });

  it('checks defaultValue of question text', () => {
    expect(result.find(OeaEditor).nodes[0].props.text).toBe('This is dummy text');
  });

  it('blurring the quesiton text calls updateChoice', () => {
    const inputs = result.find(OeaEditor);
    inputs.at(0).props().onBlur('lasers are neat');
    expect(updatedChoice.text).toBe('lasers are neat');
  });

  it('finds all buttons when shuffle is true', () => {
    const buttons = result.find('button');
    expect(buttons.length).toBe(3);
  });

  it('finds only one button', () => {
    props.shuffle = true;
    result = shallow(<Option {...props} />);
    const buttons = result.find('button');
    expect(buttons.length).toBe(1);
  });

  it('finds button and clicks it upward', () => {
    const buttons = result.find('button');
    buttons.at(1).simulate('click', { target: { innerText: buttons.at(0).text() } });
    expect(moveChoice).toBe('arrow_upward');
  });

  it('finds button and clicks it downward', () => {
    const buttons = result.find('button');
    buttons.at(1).simulate('click', { target: { innerText: buttons.at(1).text() } });
    expect(moveChoice).toBe('arrow_downward');
  });

  it('finds button and clicks it close', () => {
    const buttons = result.find('button');
    buttons.at(2).simulate('click', { target: { innerText: buttons.at(2).text() } });
    expect(moveChoice).toBe('close');
  });

  it('isActive??', () => {
    let div = result.find('.author--c-answer');
    expect(div.props().className).toContain('is-active');

    props.isActive = false;
    result = shallow(<Option {...props} />);
    div = result.find('.author--c-answer');
    expect(div.props().className).not.toContain('is-active');
  });
});
