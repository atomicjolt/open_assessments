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
      }, {
        id: '78',
        name: 'IMATITLESPEC',
        type: '3',
        index: 2,
        question: {
          text: {
            name: 'NAMEME',
          },
          choices: [],
        },
      }],
      bankId: '123',
      name: 'IMASPEC',
      assessmentOffered: [{
        nOfM: 1
      }],
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

  it('renders the N of M selector', () => {
    expect(result.find('#nOfM').length).toBe(1);
  });

  it('includes the right class so renders in one line', () => {
    expect(result.find('.au-c-dropdown--side-label').length).toBe(1);
  });

  it('renders the label', () => {
    expect(result.find('label.au-u-mr-sm').length).toBe(1);
    expect(result.find('label.au-u-mr-sm').html()).toContain('for="nOfM"');
  });

  it('shows equal number of select options as number of items', () => {
    // Note that the first select is always "all"
    //   for assessment with 1 item, no additional options
    expect(result.find('.n-of-m-option').length).toBe(2);
  });

  it('formats the N of M option text correct', () => {
    expect(result.find('.n-of-m-option').last().html()).toContain('1 of 2');
  });

  it('should pull N of M from the offered', () => {
    expect(result.find('select').prop('value')).toEqual(1);
  });

  it('should have default N of M value when no offereds', () => {
    props.assessmentOffered = [];
    result = shallow(<AssessmentForm {...props} />);
    expect(result.find('select').prop('value')).toEqual(-1);
  });

  it('should have default N of M value when offereds not defined', () => {
    props.assessmentOffered = null;
    result = shallow(<AssessmentForm {...props} />);
    expect(result.find('select').prop('value')).toEqual(-1);
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
