import React              from 'react';
import TestUtils          from 'react-addons-test-utils';
import _                  from 'lodash';
import { BankNavigator }  from './_bank_navigator';

jest.mock('../../../libs/assets');

describe('Bank Navigator', () => {
  let result;
  let props;
  let calledFuncts = [];

  beforeEach(() => {
    calledFuncts = [];

    props = {
      assessments: {},
      banks: [
        {
          id: '1',
          displayName: { text: 'taco' },
          assignedBankIds: [],
          type: 'OsidNode'
        },
        {
          id: '2',
          displayName: { text: 'apple' },
          assignedBankIds: [],
          type: 'OsidNode'
        },
        {
          id: '3',
          displayName: { text: 'rice' },
          assignedBankIds: [],
          type: 'OsidNode'
        },
      ],
      settings: {
        editableBankId   : 'bankId123',
        publishedBankId  : 'publishedId123',
        baseEmbedUrl     : 'LOOKASPEC',
      },
      path               : [],
      updatePath         : () => { calledFuncts.push('updatePath'); },
      getBanks           : () => { calledFuncts.push('getBanks'); },
      getAssessments     : () => { calledFuncts.push('getAssessments'); },
      createAssessment   : () => { calledFuncts.push('createAssessment'); },
      deleteAssessment   : () => { calledFuncts.push('deleteAssessment'); },
      togglePublishAssessment: () => {},
      currentBankId      : '',
      banksLoaded: false,
      getAssessmentOffered: () => {},
    };
    result = TestUtils.renderIntoDocument(<BankNavigator {...props} />);
  });

  it('renders', () => {
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(result, 'div');
    expect(divs.length).toBeGreaterThan(0);
  });

  it('updates the path, gets assessments, and gets items, when a bank is selected', () => {
    result.getBankChildren({ id: 1, displayName: { text: 'tacos' } });
    expect(_.indexOf(calledFuncts, 'getAssessments')).toBeGreaterThan(-1);
  });

  it('correctly sorts by type', () => {
    result.sortBy('sortName');
    expect(result.state.sortName).toBe('asc');

    result.sortBy('sortName');
    expect(result.state.sortName).toBe('desc');

    result.sortBy('sortName');
    expect(result.state.sortName).toBe(null);

    result.sortBy('sortName');
    result.sortBy('sortName');
    result.sortBy('sortPublished');
    expect(result.state.sortName).toBe('desc');
    expect(result.state.sortPublished).toBe('asc');
  });

  it('sorts the banks by name ascending', () => {
    result.sortBy('sortName');
    const ascNameSorted = result.sortContents(props.banks);

    expect(ascNameSorted[0].displayName.text).toBe('apple');
    expect(ascNameSorted[1].displayName.text).toBe('rice');
    expect(ascNameSorted[2].displayName.text).toBe('taco');
  });

  it('sorts the banks by name descending', () => {
    result.sortBy('sortName');
    result.sortBy('sortName');
    const ascNameSorted = result.sortContents(props.banks);

    expect(ascNameSorted[0].displayName.text).toBe('taco');
    expect(ascNameSorted[1].displayName.text).toBe('rice');
    expect(ascNameSorted[2].displayName.text).toBe('apple');
  });

  it('has spinner', () => {
    props.banks = [];
    result = TestUtils.renderIntoDocument(<BankNavigator {...props} />);
    const spinner = TestUtils.findRenderedDOMComponentWithClass(result, 'spinner');
    expect(spinner).toBeDefined();
  });

//  TODO: when published is fully implemented write a spec to test it's sort
});
