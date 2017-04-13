import React              from 'react';
import TestUtils          from 'react-addons-test-utils';
import Stub               from '../../../../specs_support/stub';
import BankList           from './bank_list';

describe('bank List', () => {
  let result;
  let props;

  beforeEach(() => {
    props = {
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
      getEmbedCode: () => {},
      publishedBankId: '7',
      sortBy: () => {},
      getBankChildren: () => {},
      baseEmbedUrl: 'LOOKASPEC',
      banksLoaded: true,
    };

    result = TestUtils.renderIntoDocument(<Stub><BankList {...props} /></Stub>);
  });

  it('renders all the provided banks', () => {
    const rows = TestUtils.scryRenderedDOMComponentsWithTag(result, 'tr');
    expect(rows.length).toBe(4);
  });

});
