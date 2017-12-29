import React            from 'react';
import ReactDOM         from 'react-dom';
import { shallow }      from 'enzyme';
import { Question }     from './_question';
import shortAnswer      from './short_answer';

jest.mock('../../../../libs/assets.js');

describe('question component', () => {
  let props;
  let result;
  let movedUp;
  let itemUpdated;
  let iframe;
  let div;

  beforeEach(() => {
    // for iframe / instructions tests:
    // https://stackoverflow.com/a/33404017
    // https://stackoverflow.com/a/39671492
    iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    div = document.createElement('div');

    movedUp = false;
    itemUpdated = false;
    props = {
      item: {
        bankId: '',
        id: '76',
        displayName: {
          text: 'IMATITLESPEC',
          languageTypeId: '639-2%3AENG%40ISO',
        },
        description: {
          text: 'IMADESCRIPTION',
        },
        type: '',
        index: 1,
        question: {
          shuffle: true,
        },
      },
      bankId: '',
      isActive: false,
      itemIndex: 7,
      topItem: false,
      bottomItem: false,
      reorderActive: false,
      updateItem: () => { itemUpdated = true; },
      updateChoice: () => {},
      activateItem: () => {},
      toggleReorder: () => {},
      deleteAssessmentItem: () => {},
      moveItem: () => { movedUp = true; },
      uploadedAssets: () => {},
      makeReflection: () => {},
      createChoice: () => {},
    };

    result = shallow(<Question {...props} />);
  });

  it('handles moveQuestionUp', () => {
    expect(movedUp).toBeFalsy();
    result.instance().moveQuestionUp();
    expect(movedUp).toBeTruthy();
  });

  it('handles moveQuestionDown', () => {
    expect(movedUp).toBeFalsy();
    result.instance().moveQuestionDown();
    expect(movedUp).toBeTruthy();
  });

  it('handles updateItem', () => {
    expect(itemUpdated).toBeFalsy();
    result.instance().updateItem({ text: 'asdf' });
    expect(itemUpdated).toBeTruthy();
  });

  it('shows renders Multiple Choice', () => {
    props.item.type = 'multipleChoice';
    result = shallow(<Question {...props} />);

    const multipleChoice = result.find('MultipleChoice');
    expect(multipleChoice.length).toBe(1);
  });

  it('shows renders Audio Upload', () => {
    props.item.type = 'audioUpload';
    result = shallow(<Question {...props} />);

    const audioUpload = result.find('AudioUpload');

    expect(audioUpload.length).toBe(1);
  });

  it('shows renders fileUpload', () => {
    props.item.type = 'fileUpload';
    result = shallow(<Question {...props} />);

    const fileUpload = result.find('FileUpload');
    expect(fileUpload.length).toBe(1);
  });

  it('shows renders shortAnswer', () => {
    props.item.type = 'shortAnswer';
    result = shallow(<Question {...props} />);

    const shortAns = result.find(shortAnswer);
    expect(shortAns.length).toBe(1);
  });

  it('returns correct value from getClassName', () => {
    props.isActive = true;
    result = shallow(<Question {...props} />);

    const div = result.find('.is-active');
    expect(div.length).toBe(1);
  });

  it('generates no instructions when inactive, without choices', () => {
    props.item.type = 'multipleChoice';
    props.item.question.choices = {};
    result = shallow(<Question {...props} />);
    const instructions = result.instance().contentInstructions();
    expect(instructions).toBe(null);
  });

  it('generates no instructions when inactive, even with choices', () => {
    props.item.type = 'multipleChoice';
    props.item.question.choices = {
      123: 'foo'
    };
    result = shallow(<Question {...props} />);
    const instructions = result.instance().contentInstructions();
    expect(instructions).toBe(null);
  });

  it('generates no instructions when active, with no choices', () => {
    props.item.type = 'multipleChoice';
    props.item.question.choices = {};
    props.isActive = true;
    result = shallow(<Question {...props} />);
    const instructions = result.instance().contentInstructions();
    expect(instructions).toBe(null);
  });

  it('generates instructions when active with choices, MC', () => {
    props.item.type = 'multipleChoice';
    props.item.question.choices = {
      123: 'foo'
    };
    props.isActive = true;
    result = shallow(<Question {...props} />);
    const instructions = result.instance().contentInstructions();
    iframe.contentDocument.body.appendChild(div);
    ReactDOM.render(instructions, div);

    const instructionBlock = div.querySelectorAll('.au-c-question__option-instructions');
    expect(instructionBlock.length).toBe(1);

    // this should always be there, to provide left-padding for
    //   components with right-only instructions, like MW Sandbox
    const instructionLeft = div.querySelectorAll('.au-c-question__option-instructions-left');
    expect(instructionLeft.length).toBe(1);

    const instructionRight = div.querySelectorAll('.au-c-question__option-instructions-right');
    expect(instructionRight.length).toBe(0);
  });

  it('generates instructions when active with choices, MC multi-answer', () => {
    props.item.type = 'multipleAnswer';
    props.item.question.choices = {
      123: 'foo'
    };
    props.isActive = true;
    result = shallow(<Question {...props} />);
    const instructions = result.instance().contentInstructions();
    iframe.contentDocument.body.appendChild(div);
    ReactDOM.render(instructions, div);

    const instructionBlock = div.querySelectorAll('.au-c-question__option-instructions');
    expect(instructionBlock.length).toBe(1);

    // this should always be there, to provide left-padding for
    //   components with right-only instructions, like MW Sandbox
    const instructionLeft = div.querySelectorAll('.au-c-question__option-instructions-left');
    expect(instructionLeft.length).toBe(1);

    const instructionRight = div.querySelectorAll('.au-c-question__option-instructions-right');
    expect(instructionRight.length).toBe(0);
  });

  it('generates instructions when active with choices, FITB', () => {
    props.item.type = 'movableFillBlank';
    props.item.question.choices = {
      123: 'foo'
    };
    props.isActive = true;
    result = shallow(<Question {...props} />);
    const instructions = result.instance().contentInstructions();
    iframe.contentDocument.body.appendChild(div);
    ReactDOM.render(instructions, div);

    const instructionBlock = div.querySelectorAll('.au-c-question__option-instructions');
    expect(instructionBlock.length).toBe(1);

    // this should always be there, to provide left-padding for
    //   components with right-only instructions, like MW Sandbox
    const instructionLeft = div.querySelectorAll('.au-c-question__option-instructions-left');
    expect(instructionLeft.length).toBe(1);

    const instructionRight = div.querySelectorAll('.au-c-question__option-instructions-right');
    expect(instructionRight.length).toBe(1);
  });

  it('generates instructions when active with choices, image sequence', () => {
    props.item.type = 'imageSequence';
    props.item.question.choices = {
      123: 'foo'
    };
    props.isActive = true;
    result = shallow(<Question {...props} />);
    const instructions = result.instance().contentInstructions();
    iframe.contentDocument.body.appendChild(div);
    ReactDOM.render(instructions, div);

    const instructionBlock = div.querySelectorAll('.au-c-question__option-instructions');
    expect(instructionBlock.length).toBe(1);

    // this should always be there, to provide left-padding for
    //   components with right-only instructions, like MW Sandbox
    const instructionLeft = div.querySelectorAll('.au-c-question__option-instructions-left');
    expect(instructionLeft.length).toBe(1);

    const instructionRight = div.querySelectorAll('.au-c-question__option-instructions-right');
    expect(instructionRight.length).toBe(0);
  });

  it('generates instructions when active with choices, MW sandbox', () => {
    props.item.type = 'movableWordSandbox';
    props.item.question.choices = {
      123: 'foo'
    };
    props.isActive = true;
    result = shallow(<Question {...props} />);
    const instructions = result.instance().contentInstructions();
    iframe.contentDocument.body.appendChild(div);
    ReactDOM.render(instructions, div);

    const instructionBlock = div.querySelectorAll('.au-c-question__option-instructions');
    expect(instructionBlock.length).toBe(1);

    // this should always be there, to provide left-padding for
    //   components with right-only instructions, like MW Sandbox
    const instructionLeft = div.querySelectorAll('.au-c-question__option-instructions-left');
    expect(instructionLeft.length).toBe(1);

    const instructionRight = div.querySelectorAll('.au-c-question__option-instructions-right');
    expect(instructionRight.length).toBe(1);
  });

  it('generates instructions when active with choices, MW sentence', () => {
    props.item.type = 'movableWordSentence';
    props.item.question.choices = {
      123: 'foo'
    };
    props.isActive = true;
    result = shallow(<Question {...props} />);
    const instructions = result.instance().contentInstructions();
    iframe.contentDocument.body.appendChild(div);
    ReactDOM.render(instructions, div);

    const instructionBlock = div.querySelectorAll('.au-c-question__option-instructions');
    expect(instructionBlock.length).toBe(1);

    // this should always be there, to provide left-padding for
    //   components with right-only instructions, like MW Sandbox
    const instructionLeft = div.querySelectorAll('.au-c-question__option-instructions-left');
    expect(instructionLeft.length).toBe(1);

    const instructionRight = div.querySelectorAll('.au-c-question__option-instructions-right');
    expect(instructionRight.length).toBe(1);
  });

  afterEach(() => {
    // https://stackoverflow.com/a/33404017
    document.body.removeChild(iframe);
  });
});
