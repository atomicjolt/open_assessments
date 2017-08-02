import React              from 'react';
import { shallow }        from 'enzyme';
import QuestionText       from './text';
import Editor             from '../../../common/oea_editor';

describe('text component', () => {
  let props;
  let result;

  beforeEach(() => {
    props = {
      itemId: '7',
      updateItem: () => {},
      bankId: '',
    };
    result = shallow(<QuestionText {...props} />);
  });

  it('renders question text label', () => {
    const input = result.find('label');
    expect(input).toBeDefined();
  });

  it('renders the Editor component', () => {
    expect(result.find(Editor).props()).toBeDefined();
  });

  it('renders the question text in english', () => {
    // this assumes that "English" is in the localized text for
    //   the question placeholder
    props.language = '639-2%3AENG%40ISO';
    result = shallow(<QuestionText {...props} />);
    expect(result.instance().props.localizeStrings().getLanguage()).toEqual('en');
  });

  it('renders the question text in hindi', () => {
    // this assumes that "Hindi" is in the localized text for
    //   the question placeholder
    props.language = '639-2%3AHIN%40ISO';
    result = shallow(<QuestionText {...props} />);
    expect(result.instance().props.localizeStrings().getLanguage()).toEqual('hi');
  });

  it('renders the question text in telugu', () => {
    // this assumes that "Telugu" is in the localized text for
    //   the question placeholder
    props.language = '639-2%3ATEL%40ISO';
    result = shallow(<QuestionText {...props} />);
    expect(result.instance().props.localizeStrings().getLanguage()).toEqual('te');
  });

  it('default question text language is english', () => {
    // this assumes that "Telugu" is in the localized text for
    //   the question placeholder
    props.language = '639-2%3ACHN%40ISO';
    result = shallow(<QuestionText {...props} />);
    expect(result.instance().props.localizeStrings().getLanguage()).toEqual('en');
  });
});
