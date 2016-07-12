import React                from 'react';
import ReactDOM             from 'react-dom';
import TestUtils            from 'react/lib/ReactTestUtils';
import { localizeStrings }  from "../../selectors/localize";
import { About }            from './about';

describe('About', ()=> {
  it('renders the about heading', ()=> {

    var result = TestUtils.renderIntoDocument(
      <About
        localizedStrings={localizeStrings({settings:{locale:"en"}})} />
    );
    expect(ReactDOM.findDOMNode(result).textContent).toEqual('Open Assessments');

  });
});
