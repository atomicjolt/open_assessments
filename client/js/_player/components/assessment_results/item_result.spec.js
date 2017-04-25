import React              from 'react';
import ReactDOM           from 'react-dom';
import TestUtils          from 'react-addons-test-utils';
import ItemResult         from './item_result';

describe('item result', function() {
  var question = {
    material: "Hello World",
    questionType: "multiple_answers_question",
    outcomes: {
      longOutcome: "Long",
      shorOutcome: "Short"
    }
  };

  var Subject = (<ItemResult settings={{}} question={question} isCorrect={true} confidence={"Just A Guess"} />);
  var result = TestUtils.renderIntoDocument(Subject);

  it('renders the Item result with correct answer', function() {
    expect(ReactDOM.findDOMNode(result).textContent).toContain("Hello World");
    expect(ReactDOM.findDOMNode(result).textContent).toContain("You were correct");
  });

  it('renders the Item result with incorrect answer', function() {
    Subject = (<ItemResult question={question} isCorrect={false} confidence={"Just A Guess"} />);
    result = TestUtils.renderIntoDocument(Subject);
    expect(ReactDOM.findDOMNode(result).textContent).toContain("Hello World");
    expect(ReactDOM.findDOMNode(result).textContent).toContain("You were incorrect");
  });

});
