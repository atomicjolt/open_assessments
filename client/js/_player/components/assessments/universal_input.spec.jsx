import React                     from 'react';
import ReactDOM                  from 'react-dom';
import TestUtils                 from 'react-dom/test-utils';
import { mount, shallow }        from 'enzyme';
import UniversalInput            from './universal_input';

describe('Assessment Questions', () => {

  let result;
  let item;
  let props;
  let Content;
  const selectAnswer = () => {};

  // mountResult() renders full component, including child components
  const mountResult = () => {
    Content = (<UniversalInput {...props} />);
    result = mount(Content);
  };

  // shallowResult() renders component, child components only get sent props if they exist
  const shallowResult = () => {
    Content = (<UniversalInput {...props} />);
    result = shallow(Content);
  };

  describe('Checking for Default Renders', () => {
    beforeEach(() => {
      props = {
        item: {
          question_type: 'text_input_question',
          question_meta: {
            expectedLines: 1,
          },
          answers  : [{ id: '0', material: 'test1' }, { id: '1', material: 'test2' }],
        },
        settings: {},
        selectAnswer: () => {},
        questionResult: {},
        isResult: false,
      };
    });

    afterEach(() => {
      props = {};
      Content = '';
      result = '';
    });

    it('It Renders the page', () => {
      shallowResult();
      expect(result).toBeDefined();
      expect(result.find('.empty').exists()).toBe(false);
    });

    it('Does not render the solution if the question is not answered', () => {
      shallowResult();
      expect(result.find(props.item.answers[0].material).exists()).toBe(false);
      expect(result.find(props.item.answers[1].material).exists()).toBe(false);
    });

    it('Adds empty container style to default answered question_types', () => {
      props.questionResult.correct = true;
      shallowResult();
      expect(result.find('.empty').exists()).toBe(true);
    });
  });

  // covers edx_multiple_choice, multiple_choice_question, true_false_question, survey_question
  describe('Multiple Choice', () => {
    beforeEach(() => {
      item = {
        id       : 0,
        question_type: 'multiple_choice_question',
        url      : 'www.iamcool.com',
        title    : 'title',
        xml      : null,
        standard : 'edX',
        edXMaterial : '<p>hello world</p>',
        answers  : [{ id: '0', material: 'test1' }, { id: '1', material: 'test2' }],
        isGraded : true,
        messages : ['My Message1', 'My Message2'],
        solution : '<p>solution text</p>'
      };

      Content = (<UniversalInput settings={{}} item={item} selectAnswer={selectAnswer} />);
      result = TestUtils.renderIntoDocument(Content);
    });

    afterEach(() => {
      item = {};
      Content = '';
      result = '';
    });

    it('It Renders the radio buttons', () => {
      expect(TestUtils.scryRenderedComponentsWithType(result, 'radio')).toBeDefined();
    });

    it('It Renders the option text', () => {
      expect(ReactDOM.findDOMNode(result).textContent).toContain(item.answers[0].material);
      expect(ReactDOM.findDOMNode(result).textContent).toContain(item.answers[1].material);
    });
  });

  describe('Edx Drop Down', () => {
    beforeEach(() => {
      item = {
        question_type: 'edx_dropdown',
        answers  : [{ id: 0, material: ['option1', 'option2', 'option3'] }],
      };

      Content = (<UniversalInput settings={{}} item={item} />);
      result = TestUtils.renderIntoDocument(Content);
    });

    afterEach(() => {
      item = {};
      Content = '';
      result = '';
    });

    it('Renders the drop down element', () => {
      expect(TestUtils.scryRenderedDOMComponentsWithTag(result, 'select')).toBeDefined();
    });

    it('All the options are in the dropdown', () => {
      const options = TestUtils.scryRenderedDOMComponentsWithTag(result, 'option');
      expect(options[0].textContent).toContain('option1');
      expect(options[1].textContent).toEqual('option2');
      expect(options[2].textContent).toEqual('option3');
    });
  });

  describe('Edx Numerical Input', () => {
    beforeEach(() => {
      item = {
        id       : 0,
        question_type: 'edx_numerical_input',
        url      : 'www.iamcool.com',
        title    : 'title',
        xml      : null,
        standard : 'edX',
        edXMaterial : '<p>hello world</p>',
        answers  : [{ id: '0', material: 'test1' }, { id: '1', material: 'test2' }],
        isGraded : true,
        messages : ['My Message1', 'My Message2'],
        solution : '<p>solution text</p>'
      };

      Content = (<UniversalInput settings={{}} item={item} />);
      result = TestUtils.renderIntoDocument(Content);
    });

    afterEach(() => {
      item = {};
      Content = '';
      result = '';
    });

    it('Renders the sub-question text', () => {
      expect(ReactDOM.findDOMNode(result).textContent).toContain(item.answers[0].material);
      expect(ReactDOM.findDOMNode(result).textContent).toContain(item.answers[1].material);
    });

    it('Renders the text input', () => {
      expect(TestUtils.scryRenderedDOMComponentsWithTag(result, 'input')).toBeDefined();
    });
  });

  describe('Edx Text Input', () => {
    beforeEach(() => {
      item = {
        id       : 0,
        question_type: 'edx_text_input',
        url      : 'www.iamcool.com',
        title    : 'title',
        xml      : null,
        standard : 'edX',
        edXMaterial : '<p>hello world</p>',
        answers  : [{ id: '0', material: 'test1' }, { id: '1', material: 'test2' }],
        isGraded : true,
        messages : ['My Message1', 'My Message2'],
        solution : '<p>solution text</p>'
      };

      Content = (<UniversalInput settings={{}} item={item} selectAnswer={selectAnswer} />);
      result = TestUtils.renderIntoDocument(Content);
    });

    afterEach(() => {
      item = {};
      Content = '';
      result = '';
    });

    it('Renders the sub-question text', () => {
      expect(ReactDOM.findDOMNode(result).textContent).toContain(item.answers[0].material);
      expect(ReactDOM.findDOMNode(result).textContent).toContain(item.answers[1].material);
    });

    it('Renders the text input', () => {
      expect(TestUtils.scryRenderedDOMComponentsWithTag(result, 'input')).toBeDefined();
    });
  });

  describe('Short Answer', () => {
    beforeEach(() => {
      props = {
        item: {
          question_type: 'short_answer_question',
          question_meta: {
            expectedLines: 1,
          },
          answers: ['abc'],
        },
        settings: {},
        selectAnswer: () => {},
        questionResult: {},
        isResult: false,
      };
    });

    afterEach(() => {
      props = {};
      Content = '';
      result = '';
    });

    it('Enables the textarea for answering', () => {
      shallowResult();
      expect(result.find('textarea[disabled=true]').exists()).toBe(false);
      expect(result.find('.empty').exists()).toBe(false);
    });

    it('Shows saved response in UI, adds class, disables textarea', () => {
      props.questionResult = {
        answerIds: 'abc',
        correct: true,
        feedback: 'good job',
      };
      props.isResult = true;
      shallowResult();
      expect(result.find('textarea[value="abc"]').exists()).toBe(true);
      expect(result.find('.empty').exists()).toBe(true);
      expect(result.find('textarea[disabled=true]').exists()).toBe(true);
    });
  });

  describe('Numerical Answer', () => {
    beforeEach(() => {
      props = {
        item: {
          question_type: 'numerical_input_question',
          question_meta: {
            expectedLines: 1,
          },
          answers: ['123'],
        },
        settings: {},
        selectAnswer: () => {},
        questionResult: {},
        isResult: false,
      };
    });

    afterEach(() => {
      props = {};
      Content = '';
      result = '';
    });

    it('Enables the textarea for answering', () => {
      shallowResult();
      expect(result.find('textarea[disabled=true]').exists()).toBe(false);
      expect(result.find('.empty').exists()).toBe(false);
    });

    it('Shows saved response in UI, adds class, disables textarea', () => {
      props.questionResult = {
        answerIds: '123',
        correct: true,
        feedback: 'good job',
      };
      props.isResult = true;
      shallowResult();
      expect(result.find('textarea[value="123"]').exists()).toBe(true);
      expect(result.find('.empty').exists()).toBe(true);
      expect(result.find('textarea[disabled=true]').exists()).toBe(true);
    });
  });

  describe('Multiple Answer', () => {
    beforeEach(() => {
      item = {
        id       : 0,
        question_type: 'multiple_answers_question',
        url      : 'www.iamcool.com',
        title    : 'title',
        xml      : null,
        standard : 'edX',
        edXMaterial : '<p>hello world</p>',
        answers  : [{ id: '0', material: 'test1' }, { id: '1', material: 'test2' }],
        isGraded : true,
        messages : ['My Message1', 'My Message2'],
        solution : '<p>solution text</p>'
      };

      Content = (
        <UniversalInput
          settings={{}}
          item={item}
          selectAnswer={selectAnswer}
        />
      );
      result = TestUtils.renderIntoDocument(Content);
    });

    afterEach(() => {
      item = {};
      Content = '';
      result = '';
    });

    it('Renders the checkboxes', () => {
      expect(TestUtils.scryRenderedComponentsWithType(result, 'checkbox')).toBeDefined();
    });

    it('Checkbox text is rendered', () => {
      expect(ReactDOM.findDOMNode(result).textContent).toContain(item.answers[0].material);
      expect(ReactDOM.findDOMNode(result).textContent).toContain(item.answers[1].material);
    });
  });

  describe('Edx Image Mapped Input', () => {
    beforeEach(() => {
      item = {
        question_type: 'edx_image_mapped_input',
        answers  : [{ id: 0, material:['100', '100', '100', '100'], coordinates: ['200', '200', '200', '200'], height: 100, width: 100 }],
      };

      Content = (<UniversalInput settings={{}} item={item} />);
      result = shallow(Content);
    });
    afterEach(() => {
      item = {};
      Content = '';
      result = '';
    });

    it('Renders the image to the page', () => {
      expect(result.find('img')).toBeDefined();
    });
  });

  // xdescribe('Problem with Adaptive Hint', ()=>{});

  describe('Edx Drag and Drop', () => {
    beforeEach(() => {
      props = {
        item: {
          question_type: 'edx_drag_and_drop',
          answers: [{
            id: 0,
            type: 'key',
            draggables: [{ id:'0', label:'drag1' }, { id:'1', label:'drag2' }, { id:'2', label:'drag3' }],
            targets: [{ id:'0', height:'100', width:'180', xPos:'10', yPos:'10' }],
            img: 'http://www.bealecorner.com/trv900/respat/eia1956-small.jpg',
          },
          {
            id: 0,
            type: 'value',
            draggables: [{ id:'0', label:'drag1' }, { id:'1', label:'drag2' }, { id:'2', label:'drag3' }],
            img: 'http://www.bealecorner.com/trv900/respat/eia1956-small.jpg',
          }],
        }
      };
      result = shallow(<UniversalInput {...props} />);
    });

    afterEach(() => {
      props = {};
      Content = '';
      result = '';
    });

    it('Renders the components', () => {
      expect(result).toBeDefined();
    });
  });

  describe('File Upload', () => {

    beforeEach(() => {
      props = {
        item: {
          question_type: 'file_upload_question',
          answers: ['test answer'],
        },
        localizedStrings: {
          fileUpload: {
            chooseFile: 'Choose a File to Upload',
            noFile: 'No file chosen',
          },
        },
        settings: {},
        selectAnswer: () => {},
        questionResult: {},
        isResult: false,
      };
    });

    afterEach(() => {
      props = {};
      Content = '';
      result = '';
    });

    it('Enables the file buttons for answering', () => {
      mountResult(); // to find disabled attr in child
      expect(result.find('input[type="file"][disabled=true]').exists()).toBe(false);
      expect(result.find('.c-disable-pointer-n-keys').exists()).toBe(false);
    });

    it('Shows saved response in UI, adds class, disables file button', () => {
      props.questionResult = {
        answerIds: [{
          name: 'choiceId1920'
        }],
        correct: true,
        feedback: 'good job',
      };
      props.isResult = true;
      mountResult(); // to find disabled attr in child
      expect(result.find('input[type="text"][value="choiceId1920"]').exists()).toBe(true);
      expect(result.find('.c-disable-pointer-n-keys').exists()).toBe(true);
      expect(result.find('input[type="file"][disabled=true]').exists()).toBe(true);
    });
  });

  describe('Audio Upload', () => {
    beforeEach(() => {
      props = {
        item: {
          question_type: 'audio_upload_question',
          answers: ['test answer'],
        },
        localizedStrings: {
          audioUpload: {
            record: 'Record',
            stop: 'top',
            recordTime: 'Recording time',
          },
        },
        settings: {},
        selectAnswer: () => {},
        questionResult: {},
        isResult: false,
      };
    });

    afterEach(() => {
      props = {};
      Content = '';
      result = '';
    });

    it('Enables the file buttons for answering', () => {
      mountResult(); // to find disabled attr in child
      expect(result.find('button[disabled=true]').exists()).toBe(false);
    });

    it('Disables audio_upload button, on correct:true', () => {
      props.questionResult.correct = true;
      props.isResult = true;
      mountResult(); // to find disabled attr in child
      expect(result.find('button[disabled=true]').exists()).toBe(true);
    });
  });

  describe('Movable Object Chain', () => {
    beforeEach(() => {
      props = {
        item: {
          question_type: 'movable_object_chain',
          answers: [{ id: 0, material: 'option1' }, { id: 1, material: 'option2' }],
        },
        settings: {},
        selectAnswer: () => {},
        questionResult: {},
        isResult: false,
      };
    });

    afterEach(() => {
      props = {};
      Content = '';
      result = '';
    });

    it('Enables the movable objects for answering', () => {
      shallowResult(); // to find class in parent component
      expect(result.find('.c-disable-pointer-n-keys').exists()).toBe(false);
    });

    it('Disables mouse actions in the answer container, on correct:true', () => {
      props.questionResult.correct = true;
      shallowResult(); // to find class in parent component
      expect(result.find('.c-disable-pointer-n-keys').exists()).toBe(true);
    });
  });

  describe('Movable Word Sentence', () => {
    beforeEach(() => {
      props = {
        item: {
          question_type: 'movable_words_sentence',
          answers: [{ id: 0, material: 'option1' }, { id: 1, material: 'option2' }],
          question_meta: {
            responseIdentifier: 'RESPONSE_1',
            shuffle: true,
          },
        },
        settings: {},
        selectAnswer: () => {},
        questionResult: {},
        isResult: false,
      };
    });

    afterEach(() => {
      props = {};
      Content = '';
      result = '';
    });

    it('Enables the movable words for answering', () => {
      shallowResult(); // to find class in parent component
      expect(result.find('.c-disable-pointer-n-keys').exists()).toBe(false);
    });

    it('Disables mouse actions in the answer container, on correct:true', () => {
      props.questionResult.correct = true;
      shallowResult(); // to find class in parent component
      expect(result.find('.c-disable-pointer-n-keys').exists()).toBe(true);
    });
  });

  describe('Fill in the Blank', () => {
    beforeEach(() => {
      props = {
        item: {
          question_type: 'fill_the_blank_question',
          answers: [{ id: 'w_1_1_1_1', material: 'walks' }, { id: 's_1_1_1_1', material: 'skips' }, { id: 'r_1_1_1_1', material: 'runs' }],
          material: '',
          question_meta: {
            fillTheBlankSentence: ['the', 'bunny', 'on', 'the', 'grass'],
          },
        },
        settings: {},
        selectAnswer: () => {},
        questionResult: {},
        isResult: false,
      };
    });

    afterEach(() => {
      props = {};
      Content = '';
      result = '';
    });

    it('Enables the movable words for answering', () => {
      shallowResult(); // to find class in parent component
      expect(result.find('.c-disable-pointer-n-keys').exists()).toBe(false);
    });

    it('Disables mouse actions in the answer container, on correct:true', () => {
      props.questionResult.correct = true;
      shallowResult(); // to find class in parent component
      expect(result.find('.c-disable-pointer-n-keys').exists()).toBe(true);
    });
  });

});
