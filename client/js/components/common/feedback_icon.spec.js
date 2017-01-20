import React      from 'react';
import ReactDOM   from 'react-dom';
import TestUtils  from 'react-addons-test-utils';

import { CORRECT, INCORRECT, UNGRADED } from "../assessments/universal_input";
import FeedbackIcon from './feedback_icon';

describe('feedback icon', () => {
  it('renders correct answer icon when gradeState is CORRECT', () => {
    var result = TestUtils.renderIntoDocument(
      <FeedbackIcon gradeState={CORRECT} />
    );
    var subject = ReactDOM.findDOMNode(result);
    expect(subject.outerHTML).toContain('c-feedback--correct');
    expect(subject.outerHTML).not.toContain('c-feedback--incorrect');
  });

  it('renders incorrect answer icon when gradeState is INCORRECT', () => {
    var result = TestUtils.renderIntoDocument(
      <FeedbackIcon gradeState={INCORRECT} />
    );
    var subject = ReactDOM.findDOMNode(result);
    expect(subject.outerHTML).not.toContain('c-feedback--correct');
    expect(subject.outerHTML).toContain('c-feedback--incorrect');
  });

  it('returns null when gradeState is UNGRADED', () => {
    var result = TestUtils.renderIntoDocument(
      <FeedbackIcon gradeState={UNGRADED} />
    );
    var subject = ReactDOM.findDOMNode(result);
    expect(subject).toEqual(null);
  });
});
