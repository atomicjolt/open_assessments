import React            from 'react';
import ReactDOM         from 'react-dom';
import { shallow }      from 'enzyme';
import renderer         from 'react-test-renderer';
import BankAssessment   from './bank_assessment';

describe('bank_assessment component', () => {
  let props;
  let result;

  beforeEach(() => {
    props = {
      assessment: {
        isPublished: false,
        bankId: '',
        id: '',
        displayName: {
          text: 'Spec Name',
        },
      },
      togglePublishAssessment: () => {},
      onFocus: () => {},
      getEmbedCode: () => {},
      baseEmbedUrl: '',
      focused: false,
      deleteAssessment: () => {},
    };
    result = shallow(<BankAssessment {...props} />);
  });

  it('renders the component as a snapshot', () => {
    expect(result).toMatchSnapshot();
  });
});
