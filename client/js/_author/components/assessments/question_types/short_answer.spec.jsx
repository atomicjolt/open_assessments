import React        from 'react';
import { shallow }  from 'enzyme';
import ShortAnswer  from './short_answer';

describe('Sets size for short answer', () => {
  let result;
  let props;

  beforeEach(() => {
    props = {
      updateItem: newProps => this.updateItem(newProps),
      item: {
        bankId: '',
        question: {
          correctFeedBack: 'salad'
        }
      },
      language: 'eng',
    };
    result = shallow(
      <ShortAnswer {...props} />
    );
  });

  it('verifies initial size', () => {
    const select = result.find('select');
    expect(select.nodes[0].props.value).toBe('large');
  });
});
