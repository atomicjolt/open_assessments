import React            from 'react';
import { shallow }      from 'enzyme';
import MetaDataInputs   from './meta_data_inputs';
import languages        from '../../../../constants/language_types';

describe('meta data inputs component', () => {
  let props;
  let result;
  let calledUpdate;

  beforeEach(() => {
    calledUpdate = false;
    props = {
      selectedLanguage: languages.languageTypeId.english,
      labelName: () => {},
      metadataTypes: ['altText'],
      metaData: {
        language: 'English',
      },
      updateMetadata: () => { calledUpdate = true; },
    };
    result = shallow(<MetaDataInputs {...props} />);
  });

  it('renders a snapshot of the component', () => {
    expect(result).toMatchSnapshot();
  });

  it('calls updateMetadata function', () => {
    expect(calledUpdate).toBeFalsy();
    result.find('.au-c-text-input').simulate('change', { target: { value: 'something new' } });
    expect(calledUpdate).toBeTruthy();
  });
});
