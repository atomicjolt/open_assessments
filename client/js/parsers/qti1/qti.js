import _   from 'lodash';

export function getItems(sections, questionsPerSection, shuffleQuestionAnswers) {

  var items = [];
  if (!questionsPerSection || questionsPerSection <= 0) {
    for (var i = 0; i < sections.length; i++) {
      for (var j = 0; j < sections[i].items.length; j++) {
        var item = sections[i].items[j];

        if(shuffleQuestionAnswers){
          item.answers = _.shuffle(item.answers);
        }
        items.push(item);
      }
    }
  } else {
    for (var i = 0; i < sections.length; i++) {
      var count = questionsPerSection > sections[i].items.length ? sections[i].items.length : questionsPerSection;
      for (var j = 0; j < count; j++) {
        var item = sections[i].items[j];
        for (var k = 0; k < items.length; k++) {
          if (item.id == items[k].id) {
            console.error("two items have the same id.");
          }
        }
        if(shuffleQuestionAnswers){
          item.answers = _.shuffle(item.answers);
        }
        items.push(item);
      }
    }
  }
  return items;
}

// Extract outcomes from sections. Ignore the "root section" outcome.
export function loadOutcomes(sections) {
  return sections
    .map((section) => section.outcome)
    .filter((outcome) => outcome != "root section");
}

export function checkAnswer(item, selectedAnswers){
  // TODO implement checkAnswer, checkMultipleChoiceAnswer, and all other answer related methods.
  // There's still quite a bit of the ember code left. We'll need to pass values to this
  // method rather than call things like settings.get. ItemResult.create should be moved to an action and use api.js
  var results;
  switch(item.question_type){
    case 'multiple_choice_question':
      results = checkMultipleChoiceAnswer(item, selectedAnswers);
      break;
    case 'multiple_answers_question':
      results = checkMultipleAnswerAnswer(item, selectedAnswers);
      break;
    case 'matching_question':
      results = checkMatchingAnswer(item, selectedAnswers);
      break;
  }
  return results;
}

function checkMultipleChoiceAnswer(item, selectedAnswerId){
  var feedbacks = "";
  var score = "0";
  var correct = false;
  if(selectedAnswerId == item.correct[0].id){
    correct = true;
    score = item.correct[0].score;
  }
  return {
    feedbacks: feedbacks,
    score: score,
    correct: correct
  };
}

function checkMultipleAnswerAnswer(item, selectedAnswerId){
  var feedbacks = ""; // implement feedbacks
  var score = "0";
  var numOfAnswers = item.correct[0].id.length;
  var numOfCorrectAnswers = 0;
  var correct = false;

  // if they selected the right amount of answers then check if they are the right answers
  if(selectedAnswerId.length == numOfAnswers){
    for(var i = 0; i < selectedAnswerId.length; i++){
      for(var j = 0; j < numOfAnswers; j++){
        if(selectedAnswerId[i] == item.correct[0].id[j]){
          numOfCorrectAnswers++;
        }
      }
    }
    if(numOfAnswers == numOfCorrectAnswers){
      correct = true;
      score = "100";
    }
    return {
      feedbacks: feedbacks,
      score: score,
      correct: correct
    };
  }

  // if they selected to few or to many then return incorrect
  return {
    feedbacks,
    score,
    correct
  };
}

function checkMatchingAnswer(item, selectedAnswerId){
  var feedbacks = ""; // implement feedbacks
  var score = "0";
  var numOfAnswers = item.correct.length;
  var numOfCorrectAnswers = 0;
  var correct = false;
  // if they didnt match all of the answers then return false.
  if(item.correct.length > selectedAnswerId.length){
    return false;
  }

  for(var i = 0; i < numOfAnswers; i++){
    for (var j = 0; j < item.answers.length; j++){
      if(item.correct[i].id == item.answers[j].id){
        for(var k = 0; k < selectedAnswerId.length; k++){
          if(selectedAnswerId[k].answerNumber == "answer-" + i){
            if(selectedAnswerId[k].selectedAnswer.trim() == item.answers[j].material.trim()){
              numOfCorrectAnswers++;
            }
          }
        }
        break;
      }
    }
  }
  if(numOfCorrectAnswers == numOfAnswers){
    correct = true;
    score = "100";
  }

  return {
    feedbacks: feedbacks,
    score: score,
    correct: correct
  };

}
