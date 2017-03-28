import React              from 'react';
import TestUtils          from 'react-addons-test-utils';
import Stub               from '../../../../specs_support/stub';
import BankListItem       from './bank_list_item';

describe('bank List Item', () => {
  let result;
  let props;
  let shouldShow;
  let media;

  beforeEach(() => {
    shouldShow = false;
    media = false;
    props = {
      bank: {
        id: '1',
        displayName: { text: 'tacoSoup' },
        assignedBankIds: [],
        type: 'OsidNode',
        published: true
      },
      getBankChildren: () => { shouldShow =  true; },
      getEmbedCode: () => {},
      publishedBankId: '7',
      baseEmbedUrl: 'IMASPEC',
    };

    result = TestUtils.renderIntoDocument(<Stub>
      <table><tbody>
        <BankListItem {...props} />
      </tbody></table></Stub>);
  });

  it('it selectItem', () => {
    const tr = TestUtils.findRenderedDOMComponentWithTag(result, 'tr');
    TestUtils.Simulate.click(tr);
    expect(shouldShow).toBeTruthy();
  });

  it('it has correct displayName', () => {
    const tds = TestUtils.scryRenderedDOMComponentsWithTag(result, 'td');
    expect(tds[1].textContent).toContain('tacoSoup');
  });

  it('it displays button', () => {
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'button');
    expect(buttons[0].style.display).toBe('none');
  });

});
