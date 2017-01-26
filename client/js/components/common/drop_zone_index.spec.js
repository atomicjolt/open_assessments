"use strict";

import React						from 'react';
import TestUtils    		from 'react-addons-test-utils';
import DropZoneIndex		from './drop_zone_index';

describe('Drop zone for index type', ()=>{
	var instance;
	var item;
	var zone;

	beforeEach(()=>{
		item = {
			id: 0,
			img: 'http://www.bealecorner.com/trv900/respat/eia1956-small.jpg'
		};
		instance = TestUtils.renderIntoDocument(<DropZoneIndex item={item} />);
		zone = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
	});

	it('Renders', ()=>{
		expect(instance).toBeDefined();
		expect(zone.childNodes[0].src).toEqual('http://www.bealecorner.com/trv900/respat/eia1956-small.jpg');
	});
	it('Is droppable', ()=>{
		spyOn(instance, 'drop');
		TestUtils.Simulate.drop(zone);
		expect(instance.drop).toHaveBeenCalled();
	});
	it('Has drag over', ()=>{
		spyOn(instance, 'allowDrop');
		TestUtils.Simulate.dragOver(zone);
		expect(instance.allowDrop).toHaveBeenCalled();
	});
});
