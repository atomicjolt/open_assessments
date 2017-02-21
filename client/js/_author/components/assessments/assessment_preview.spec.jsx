import React        from 'react';
import TestUtils    from 'react-addons-test-utils';
import { AssessmentPreview }  from './assessment_preview';

describe('AssessmentPreview', () => {
  let props;
  beforeEach(() => {
    props = {
      assessment:{},
      getAssessmentOffered: () => {},
      settings: { baseEmbedUrl: 'base_url' }
    };
  });

  it('Gets embed code if assessment has no assessmentOfferedId', () => {
    spyOn(props, 'getAssessmentOffered');
    TestUtils.renderIntoDocument(
      <AssessmentPreview {...props} />
    );

    expect(props.getAssessmentOffered).toHaveBeenCalled();
  });

  it('Doesnt get embed code if assessment has an assessmentOfferedId', () => {
    spyOn(props, 'getAssessmentOffered');
    props.assessment.assessmentOffered = ['fake_id'];
    TestUtils.renderIntoDocument(
      <AssessmentPreview {...props} />
    );

    expect(props.getAssessmentOffered).not.toHaveBeenCalled();
  });

  it('Renders null with no assessment', () => {
    props.assessment = undefined;
    const result = TestUtils.renderIntoDocument(
      <AssessmentPreview {...props} />
    );

    const iframe = TestUtils.scryRenderedDOMComponentsWithTag(result, 'iframe');
    expect(iframe).toEqual([]);
  });

  it('Renders iframe preview', () => {
    const result = TestUtils.renderIntoDocument(
      <AssessmentPreview {...props} />
    );

    const iframe = TestUtils.scryRenderedDOMComponentsWithTag(result, 'iframe');
    expect(iframe.length).toEqual(1);
  });
});
