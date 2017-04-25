"use strict";

import React				from 'react';
import ReactDOM     from 'react-dom';
import TestUtils    from 'react-addons-test-utils';
import Draggable		from './draggable';

describe('Draggable Object', ()=>{
	var instance;
	var item;
	var zone;
	var object;

	beforeEach(()=>{
		item = {
			id: 0,
			label: 'A Label'
		};
		instance = TestUtils.renderIntoDocument(<Draggable item={item} />);
		zone = TestUtils.findRenderedDOMComponentWithClass(instance, 'dropZone');
		object = TestUtils.findRenderedDOMComponentWithClass(instance, 'draggable');
	});

	it('Renders', ()=>{
		expect(instance).toBeDefined();
		expect(ReactDOM.findDOMNode(instance).textContent).toContain('A Label');
		expect(zone).toBeDefined();
	});
	it('Is draggable', ()=>{
		expect(object.attributes.draggable).toBeTruthy();
		spyOn(instance, 'drag');
		TestUtils.Simulate.dragStart(object);
		expect(instance.drag).toHaveBeenCalled();
	});
	it('Is droppable', ()=>{
		spyOn(instance, 'drop');
		TestUtils.Simulate.drop(zone);
		expect(instance.drop).toHaveBeenCalled();
	});
	it('Has drag over', ()=>{
		expect(object).toBeDefined();
	});
});
