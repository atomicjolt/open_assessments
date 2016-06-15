import React              from 'react';
import ReactDOM           from 'react-dom';
import Immutable          from 'immutable';
import TestUtils          from 'react/lib/ReactTestUtils';

import Start              from './start';
import Rapper             from '../../../specs_support/rapper';
import configureStore     from '../../store/configure_store';

describe('start', function() {

  var result;
  var settings;

  beforeEach(()=>{
    settings = Immutable.fromJS({
      assessment_kind : "summative",
      src_url         : "asdf",
      jwt             : "asdfasdf",
      csrf            : "asdfasfd",
      api_url         : "www.example.com"
    });

    assessment = Immutable.fromJS({});

    const state = {
      settings,
      assessment
    };
    const store = configureStore(state);
    result = TestUtils.renderIntoDocument(<Rapper childProps={{store, params}} child={Start}/>);
  });

  it('renders the start page', function(){
    instance = result.refs.original.getWrappedInstance();
    expect(ReactDOM.findDOMNode(instance)).toBeDefined();
  });

});
