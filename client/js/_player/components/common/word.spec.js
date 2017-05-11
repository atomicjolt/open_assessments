"use strict";

import React				from 'react';
import TestUtils    from 'react-dom/test-utils';
import Word	       	from './word';

describe('Word', function(){
  var word;
	beforeEach(function(){
		word = TestUtils.renderIntoDocument(<Word />);
	});

	it('It renders the word', function(){
		expect(word).toBeDefined();
	});

});
