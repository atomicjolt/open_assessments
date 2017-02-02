import React				from 'react';
import TestUtils    from 'react-addons-test-utils';
import DropZone			from './old_drop_zone';

describe('Drop Zone', ()=>{
	var instance;
	var item;
	var zone;

	beforeEach(()=>{
		item = {
			id: 0,
			width: 128,
			height: 64,
			xPos: 10,
			yPos: 20
		};
		instance = TestUtils.renderIntoDocument(<DropZone item={item} />);
		zone = TestUtils.findRenderedDOMComponentWithClass(instance, 'dropZone');
	});

	it('Renders', ()=>{
		expect(zone).toBeDefined();
		expect(zone.style.top).toEqual('20px');
		expect(zone.style.left).toEqual('10px');
		expect(zone.style.height).toEqual('64px');
		expect(zone.style.width).toEqual('128px');
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
