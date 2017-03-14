import React            from 'react';
import TestUtils        from 'react-addons-test-utils';
import _                from 'lodash';
import PreviewContainer from './preview_container';

describe('preview container component', () => {
  let result;
  let props;

  beforeEach(() => {
    props = {
      assessment: {
        assessmentOffered: 'not empty',
      },
      getAssessmentOffered: () => {},
      assessmentPlayerUrl: '',
      apiUrl: '',
    };

    result = TestUtils.renderIntoDocument(<PreviewContainer {...props} />);
  });

  it('renders iFrame', () => {
    const iframe = TestUtils.findRenderedDOMComponentWithTag(result, 'iframe');
    expect(iframe).toBeDefined();
  });

  it('renders no iFrame', () => {
    props.assessment = {};
    result = TestUtils.renderIntoDocument(<PreviewContainer {...props} />);
    const iframe = TestUtils.scryRenderedDOMComponentsWithTag(result, 'iframe');
    expect(iframe.length).toBe(0);
  });
});
