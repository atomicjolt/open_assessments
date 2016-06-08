import $                  from 'jquery';
import Qti                from './qti';

export default class Assessment{

  static parse(assessmentId, assessmentXml, xml){
    var assessment = {
      id           : assessmentXml.attr('ident'),
      title        : assessmentXml.attr('title'),
      standard     : 'qti',
      assessmentId : assessmentId,
    };
    assessment.objectives = xml.find('assessment > objectives matref').map((index, item) => {
      return $(item).attr('linkrefid');
    });
    assessment.sections = Qti.parseSections(xml);
    return assessment;
  }

  static getItems(sections, perSec) {

    var items = [];
    if (!perSec || perSec <= 0) {
      for (var i = 1; i < sections.length; i++) {
        for (var j = 0; j < sections[i].items.length; j++) {
          var item = sections[i].items[j];

          //TODO: do this based on assessment setting
          item.answers = _.shuffle(item.answers);
          items.push(item);
        }
      }
    } else {
      for (var i = 1; i < sections.length; i++) {
        var count = perSec > sections[i].items.length ? sections[i].items.length : perSec;
        for (var j = 0; j < count; j++) {
          var item = sections[i].items[j];
          for (var k = 0; k < items.length; k++) {
            if (item.id == items[k].id) {
              console.error("two items have the same id.");
            }
          }
          //TODO: do this based on assessment setting
          item.answers = _.shuffle(item.answers);
          items.push(item);
        }
      }
    }
    return items;
  }

  static loadOutcomes(assessment) {
    var outcomes = assessment.sections.map((section)=> {
      if (section.outcome != "root section") {
        return section.outcome;
      }
    });
    outcomes = _.drop(outcomes);
    return outcomes;
  }

  static checkAnswer(item, selectedAnswers){
    // TODO implement checkAnswer, checkMultipleChoiceAnswer, and all other answer related methods.
    // There's still quite a bit of the ember code left. We'll need to pass values to this
    // method rather than call things like settings.get. ItemResult.create should be moved to an action and use api.js
    var results;
    switch(item.question_type){
      case 'multiple_choice_question':
        results = this.checkMultipleChoiceAnswer(item, selectedAnswers);
        break;
      case 'multiple_answers_question':
        results = this.checkMultipleAnswerAnswer(item, selectedAnswers);
        break;
      case 'matching_question':
        results = this.checkMatchingAnswer(item, selectedAnswers);
        break;
    }
    return results;
  }

  static checkMultipleChoiceAnswer(item, selectedAnswerId){
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

  static checkMultipleAnswerAnswer(item, selectedAnswerId){
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

  static checkMatchingAnswer(item, selectedAnswerId){
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

}

    // var score = 0; // TODO we should get var names and types from the QTI. For now we just use the default 'score'
    // var feedbacks = [];
    // var correct = false;
    // var respconditions = xml.find('respcondition');
    // for (var i =0; i<respconditions.length; i++){
    //   var condition = respconditions[i];
    //   condition = $(condition);
    //   var conditionMet = false;

    //   if(condition.find('conditionvar > varequal').length){
    //     var varequal = condition.find('conditionvar > varequal');

    //     if(varequal.text() === selectedAnswerId){
    //       conditionMet = true;
    //     }
    //   } else if(condition.find('conditionvar > unanswered').length){
    //     if(selectedAnswerId === null){
    //       conditionMet = true;
    //     }
    //   } else if(condition.find('conditionvar > not').length){
    //     if(condition.find('conditionvar > not > varequal').length){
    //       if(selectedAnswerId !== condition.find('conditionvar > not > varequal').text()){
    //         conditionMet = true;
    //       }
    //     } else if(condition.find('conditionvar > not > unanswered').length) {
    //       if(selectedAnswerId !== null){
    //         conditionMet = true;
    //       }
    //     }
    //   }

    //   if(conditionMet){
    //     var setvar = condition.find('setvar');
    //     if(setvar.length > 0){
    //       var setvarVal = parseFloat(setvar.text(), 10);
    //       if(setvarVal > 0){
    //         correct = true;
    //         var action = setvar.attr('action');
    //         if(action === 'Add'){
    //           score += setvarVal;
    //         } else if(action === 'Set'){
    //           score = setvarVal;
    //         }
    //       }
    //     }
    //     var feedbackId = condition.find('displayfeedback').attr('linkrefid');
    //     if(feedbackId){
    //       var feedback = xml.find('itemfeedback[ident="' + feedbackId + '"]');
    //       if(feedback && feedback.attr('view') && feedback.attr('view').length === 0 ||
    //         feedback.attr('view') === 'All' ||
    //         feedback.attr('view') === 'Candidate' ){  //All, Administrator, AdminAuthority, Assessor, Author, Candidate, InvigilatorProctor, Psychometrician, Scorer, Tutor
    //         var result = Qti.buildMaterial(feedback.find('material').children());
    //         if(feedbacks.indexOf(result) === -1){
    //           feedbacks.push(result);
    //         }
    //       }
    //     }
    //   }

    //   if(correct){
    //     return {
    //       feedbacks: feedbacks,
    //       score: score,
    //       correct: correct
    //     };
    //   }
    //   //if(condition.attr('continue') === 'No'){ return false; }
    // }
