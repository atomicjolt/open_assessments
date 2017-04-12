import React            from 'react';
import TestUtils        from 'react-addons-test-utils';
import PreviewContainer from './preview_container';

describe('preview container component', () => {
  let result;
  let props;

  beforeEach(() => {
    props = {
      assessment: {
        assessmentOffered: [{ id: 'assessOfferedId' }],
        bankId: 'bankId',
      },
      getAssessmentOffered: () => {},
      assessmentPlayerUrl: 'http://example.com',
      apiUrl: 'http://api.example.com',
      unlockNext: 'ON_CORRECT'
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

  describe('buildEmbedUrl', () => {
    it('build embed url', () => {
      const expectedResult = 'http://example.com?unlock_next=ON_CORRECT&api_url=http://api.example.com&bank=bankId&assessment_offered_id=assessOfferedId#/assessment';
      const url = result.buildEmbedUrl(props);

      expect(url).toEqual(expectedResult);
    });
  });
});
