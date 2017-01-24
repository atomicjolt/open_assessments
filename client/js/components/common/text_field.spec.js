"use strict";

import React				from 'react';
import TestUtils		from 'react-addons-test-utils';
import TextField		from './text_field';

describe('TextField', function(){

	var textField;
	var item = {
		id: 1,
		material: 'A text field'
	};

	beforeEach(function(){
		textField = TestUtils.renderIntoDocument(<TextField item={item}/>);
	});

	it('It renders the text field', function(){
		expect(textField).toBeDefined();
	});

});