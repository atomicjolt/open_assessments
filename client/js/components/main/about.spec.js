import React        from 'react';
import ReactDOM     from 'react-dom';
import TestUtils    from 'react/lib/ReactTestUtils';
import About        from './about';

describe('About', ()=> {
  it('renders the about heading', ()=> {

    var result = TestUtils.renderIntoDocument(<About/>);
    expect(ReactDOM.findDOMNode(result).textContent).toEqual('Open Assessments');

  });
});
