"use strict";

import React					from 'react';
import TestUtils			from 'react-addons-test-utils';
import MappedImage		from './mapped_image';

describe ('Mapped Image', ()=>{
	var result;
	var item;

	beforeEach(()=>{
		item = {
			id: 0,
			coordinates: [0,0,5,5],
			material: 'http://www.bealecorner.com/trv900/respat/eia1956-small.jpg',
			width: 640,
			height: 480
		};

   result = TestUtils.renderIntoDocument(<MappedImage item={item} />);
	});

	it('Renders the img', ()=>{
		const subject = TestUtils.findRenderedDOMComponentWithTag(result, 'img');
		expect(subject.src).toEqual('http://www.bealecorner.com/trv900/respat/eia1956-small.jpg');
		expect(subject.width).toEqual(640);
		expect(subject.height).toEqual(480);
	});

	it('Renders the Map', ()=>{
    var coords = item.coordinates.toString();
		const map = TestUtils.findRenderedDOMComponentWithTag(result, 'map');
		const area = TestUtils.findRenderedDOMComponentWithTag(result, 'area');
		expect(map).toBeDefined();
		expect(area).toBeDefined();
		expect(area.coords).toEqual(coords);
	});

	it('Calls the onClick', ()=>{
		var clickableArea = TestUtils.findRenderedDOMComponentWithTag(result, 'area');
		TestUtils.Simulate.click(clickableArea);
	});
});
