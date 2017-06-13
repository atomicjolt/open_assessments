import React                from 'react';
import ReactDOM             from 'react-dom';
import TestUtils            from 'react-dom/test-utils';
import Item                 from './item';
import localizeStrings      from '../../selectors/localize';

describe('item', () => {

  let question = {
    title:'Test Question Title'
  };
  let questionResult = {};
  let currentItemIndex = 0;
  let assessment = {};
  let questionCount = 10;
  let numQuestionsChecking = 0;

  let result;
  let subject;
  let svgTest;
  let classTest;

  const renderItem = () => {
    result = TestUtils.renderIntoDocument(<Item
      question={question}
      questionResult={questionResult}
      currentItemIndex={currentItemIndex}
      questionCount={questionCount}
      assessment={assessment}
      localizedStrings={localizeStrings({ settings: { locale:'en' } })}
      numQuestionsChecking={numQuestionsChecking}
      response={[]}
      videoPlay={() => {}}
      videoPause={() => {}}
      audioPlay={() => {}}
      audioPause={() => {}}
      audioRecordStart={() => {}}
      audioRecordStop={() => {}}
      selectAnswer={() => {}}

    />);
    subject = ReactDOM.findDOMNode(result);
  };

  // Reset variables to default and render an item
  beforeEach(() => {
    question = {
      title:'Test Question Title',
      material:'Test Question Material',
    };
    currentItemIndex = 0;
    assessment = {};
    questionCount = 10;

    renderItem();
  });

  it('renders an item', () => {
    expect(subject.textContent).toContain('Test Question Material');
  });

  it('renders null if numQuestionsChecking === 1', () => {
    questionResult = { correct:true, feedback:'Correct answer' };
    numQuestionsChecking = 1;
    renderItem();
    classTest = TestUtils.scryRenderedDOMComponentsWithClass(result, 'c-question-feedback'); // look for class
    expect(classTest.length).toEqual(0); // expect no class because numQuestionsChecking is truthy
  });

  describe('feedback', () => {
    it('renders non-survey question with tick mark when item is correct', () => {
      questionResult = { correct:true, feedback:'Correct answer' };
      numQuestionsChecking = 0;
      renderItem();
      svgTest = TestUtils.scryRenderedDOMComponentsWithTag(result, 'svg'); // look for svg tag
      expect(svgTest.length).toEqual(1); // expect svg tag to exist
      expect(subject.textContent).toContain('Correct');
      expect(subject.textContent).toContain('Correct answer');
      expect(subject.textContent).not.toContain('Incorrect');
      expect(subject.textContent).not.toContain('Incorrect answer');
    });

    it('renders survey question without tick mark when item is correct', () => {
      question = {
        question_type: 'survey_question' // set question type
      };
      questionResult = { correct:true, feedback:'Correct answer' };
      numQuestionsChecking = 0;
      renderItem();
      svgTest = TestUtils.scryRenderedDOMComponentsWithTag(result, 'svg'); // look for svg tag
      expect(svgTest.length).toEqual(0); // expect no svg tag
      expect(question.question_type).toContain('survey_question');
      expect(subject.textContent).toContain('Correct');
      expect(subject.textContent).toContain('Correct answer');
      expect(subject.textContent).not.toContain('Incorrect');
      expect(subject.textContent).not.toContain('Incorrect answer');
    });

    it('renders incorrect when item is incorrect', () => {
      questionResult = { correct:false, feedback:'Incorrect answer' };
      numQuestionsChecking = 0;
      renderItem();
      svgTest = TestUtils.scryRenderedDOMComponentsWithTag(result, 'svg'); // look for svg tag
      expect(svgTest.length).toEqual(1); // expect svg tag to exist
      expect(subject.textContent).toContain('Incorrect');
      expect(subject.textContent).toContain('Incorrect answer');
      expect(subject.textContent).not.toContain('Correct');
      expect(subject.textContent).not.toContain('Correct answer');

    });

    it('renders without feedback when item is unchecked', () => {
      questionResult = {};
      numQuestionsChecking = 0;
      renderItem();
      expect(subject.textContent).not.toContain('Incorrect');
      expect(subject.textContent).not.toContain('incorrect answer');
      expect(subject.textContent).not.toContain('Correct');
      expect(subject.textContent).not.toContain('Correct answer');
    });
  });

});
