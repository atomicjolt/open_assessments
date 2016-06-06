import React    from 'react';
import Router   from './routes';


describe('default route', function () {

  let node;
  beforeEach(function () {
    node = document.createElement('div');
  });

  afterEach(function () {
    unmountComponentAtNode(node);
  });

  it("renders the default route", function(done){
    render((Router), node, function(){
      expect(node.textContent).toEqual('parent child');
      done();
    });
  });

});
