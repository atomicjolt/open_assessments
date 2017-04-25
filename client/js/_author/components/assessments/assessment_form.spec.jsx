import React          from 'react';
import { shallow }    from 'enzyme';
import AssessmentForm from './assessment_form';

jest.mock('../../../libs/assets');

describe('AssessmentForm component', () => {
  let props;
  let result;
  let createItem;
  let updateItemOrderFunction;

  beforeEach(() => {
    createItem = false;
    updateItemOrderFunction = false;
    props = {
      items: [{
        id: '76',
        name: 'IMATITLESPEC',
        type: '3',
        index: 1,
        question: {
          text: {
            name: 'NAMEME',
          },
          choices: [],
        },
      }],
      bankId: '',
      name: 'IMASPEC',
      updateAssessment: () => {},
      updateItemOrder: () => { updateItemOrderFunction = true; },
      createItem: () => { createItem = true; },
      updateItem: () => {},
      updateChoice: () => {},
      updateAnswer: () => {},
      deleteAssessmentItem: () => {},
      createChoice: () => {},
    };
    result = shallow(<AssessmentForm {...props} />);
  });

  it('renders to the DOM', () => {
    expect(result.find('.au-c-assessment-title').length).toBe(1);
  });

  it('renders one labels', () => {
    expect(result.find('.test_label').length).toBe(1);
  });

  it('creates a new item', () => {
    expect(createItem).toBeFalsy();
    result.instance().createItem(props.items[0]);
    expect(createItem).toBeTruthy();
  });

  it('employs show a new modal when items is empty', () => {
    props.items = [];
    result = shallow(<AssessmentForm {...props} />);
    expect(result.find('NewItemForm').length).toBe(1);
    expect(result.find('.is-active').length).toEqual(0);
    expect(result.instance().state).not.toBeNull();
  });

  it('does not show the new modal when items is not empty', () => {
    expect(result.find('NewItemForm').length).toBe(0);
    expect(result.find('.is-active').length).toEqual(0);
    expect(result.instance().state).not.toBeNull();
  });

  it('activates a new item', () => {
    const itemId = '7';
    result.instance().activateItem(itemId);
    expect(result.instance().state.activeItem).toEqual(itemId);
    expect(result.instance().state.reorderActive).toBeFalsy();
  });

  it('moves a new item', () => {
    expect(updateItemOrderFunction).toBeFalsy();
    expect(result.instance().props.items[0].id).toBe('76');
    const oldIndex = props.items[0].id;
    const newIndex = '77';
    result.instance().moveItem(oldIndex, newIndex);
    expect(updateItemOrderFunction).toBeTruthy();
  });
});
