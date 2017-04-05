"use strict";

import React              from 'react';
import ReactDOM           from 'react-dom';
import TestUtils          from 'react-addons-test-utils';
import UniversalInput     from './universal_input';
import { shallow }        from 'enzyme';

describe('Assessment Questions', ()=> {

  var result;
  var item;
  var Content;
  var selectAnswer = () => {};

  it('It Renders the page', ()=>{
    expect(ReactDOM.findDOMNode(result)).toBeDefined();
  });


  describe('Drag and Drop', ()=>{
    let props;
    beforeEach(()=>{
      props = {
        item: {
          question_type: 'edx_drag_and_drop',
          answers: [{
            id: 0,
            type: 'key',
            draggables: [{id:'0', label:'drag1'},{id:'1', label:'drag2'},{id:'2', label:'drag3'}],
            targets: [{id:'0', height:'100', width:'180', xPos:'10', yPos:'10'}],
            img: 'http://www.bealecorner.com/trv900/respat/eia1956-small.jpg',
          },
          {
            id: 0,
            type: 'value',
            draggables: [{id:'0', label:'drag1'},{id:'1', label:'drag2'},{id:'2', label:'drag3'}],
            img: 'http://www.bealecorner.com/trv900/respat/eia1956-small.jpg',
          }],
        }
      };
      result = shallow(<UniversalInput {...props} />);
    });

    it('Renders the components', ()=>{
      expect(result).toBeDefined();
    });
  });

  describe('Multiple Choice', ()=>{

    beforeEach(()=>{
      item = {
        id       : 0,
        question_type: "multiple_choice_question",
        url      : "www.iamcool.com",
        title    : "title",
        xml      : null,
        standard : 'edX',
        edXMaterial : "<p>hello world</p>",
        answers  : [{id: "0", material: "test1"}, {id: "1", material: "test2"}],
        isGraded : true,
        messages : ["My Message1", "My Message2"],
        solution : "<p>solution text</p>"
      };

      Content = (
        <UniversalInput
          settings={ {} }
          item={item}
          selectAnswer={selectAnswer}/>
      );
      result = TestUtils.renderIntoDocument(Content);
    });

    it('It Renders the radio buttons', ()=>{
      expect(TestUtils.scryRenderedComponentsWithType(result, 'radio')).toBeDefined();
    });

    it('It Renders the option text', ()=>{
      expect(ReactDOM.findDOMNode(result).textContent).toContain(item.answers[0].material);
      expect(ReactDOM.findDOMNode(result).textContent).toContain(item.answers[1].material);
    });
  });

  describe('Numerical Input', ()=>{

    beforeEach(()=>{
      item.question_type = 'edx_numerical_input';

      Content = (<UniversalInput settings={ {} } item={item} />);
      result = TestUtils.renderIntoDocument(Content);
    });

    it('Renders the sub-question text', ()=>{
      expect(ReactDOM.findDOMNode(result).textContent).toContain(item.answers[0].material);
      expect(ReactDOM.findDOMNode(result).textContent).toContain(item.answers[1].material);
    });

    it('Renders the text input', ()=>{
      expect(TestUtils.scryRenderedDOMComponentsWithTag(result, 'input')).toBeDefined();
    });
  });

  describe('Text Input', ()=>{
    beforeEach(()=>{
      item.question_type = 'edx_numerical_input';
      Content = (
        <UniversalInput
          settings={ {} }
          item={item}
          selectAnswer={selectAnswer}
          />
      );
      result = TestUtils.renderIntoDocument(Content);
    });

    it('Renders the sub-question text', ()=>{
      expect(ReactDOM.findDOMNode(result).textContent).toContain(item.answers[0].material);
      expect(ReactDOM.findDOMNode(result).textContent).toContain(item.answers[1].material);
    });

    it('Renders the text input', ()=>{
      expect(TestUtils.scryRenderedDOMComponentsWithTag(result, 'input')).toBeDefined();
    });
  });

  describe('Drop Down', ()=>{

    beforeEach(()=>{
      item.question_type = 'edx_dropdown';
      item.answers = [{ id: 0, material: ['option1', 'option2', 'option3']}];
      Content = (<UniversalInput settings={ {} } item={item} />);
      result = TestUtils.renderIntoDocument(Content);
    });

    it('Renders the drop down element', ()=>{
      expect(TestUtils.scryRenderedDOMComponentsWithTag(result, 'select')).toBeDefined();
    });

    it('All the options are in the dropdown', ()=>{
      var options = TestUtils.scryRenderedDOMComponentsWithTag(result, 'option');
      expect(options[0].textContent).toContain('option1');
      expect(options[1].textContent).toEqual('option2');
      expect(options[2].textContent).toEqual('option3');
    });
  });

  describe('Image Mapped Input', ()=>{

    beforeEach(()=>{
      item.question_type = 'edx_image_mapped_input';
      item.answers = [{ id: 0, material:['100','100','100','100'], coordinates: ['200','200','200','200'], height: 100, width: 100}];
      Content = (<UniversalInput settings={ {} } item={item} />);
      result = TestUtils.renderIntoDocument(Content);
    });
    it('Renders the image to the page', ()=>{
      expect(TestUtils.scryRenderedDOMComponentsWithTag(result, 'img')).toBeDefined();
    });

  });

  // xdescribe('Problem with Adaptive Hint', ()=>{});

  describe('Multiple Answer', ()=>{

    beforeEach(()=>{
      item = {
        id       : 0,
        question_type: "multiple_answers_question",
        url      : "www.iamcool.com",
        title    : "title",
        xml      : null,
        standard : 'edX',
        edXMaterial : "<p>hello world</p>",
        answers  : [{id: "0", material: "test1"}, {id: "1", material: "test2"}],
        isGraded : true,
        messages : ["My Message1", "My Message2"],
        solution : "<p>solution text</p>"
      };

      Content = (
        <UniversalInput
          settings={ {} }
          item={item}
          selectAnswer={selectAnswer}/>
      );
      result = TestUtils.renderIntoDocument(Content);
    });

    it('Renders the checkboxes', ()=>{
      expect(TestUtils.scryRenderedComponentsWithType(result, 'checkbox')).toBeDefined();
    });

    it('Checkbox text is rendered', ()=>{
      expect(ReactDOM.findDOMNode(result).textContent).toContain(item.answers[0].material);
      expect(ReactDOM.findDOMNode(result).textContent).toContain(item.answers[1].material);
    });
  });


  it('Does not render the solution if the question is not answered', ()=>{
    expect(ReactDOM.findDOMNode(result).textContent).toContain(
      item.answers[0].material
      +
      item.answers[1].material
    );
  });


});
