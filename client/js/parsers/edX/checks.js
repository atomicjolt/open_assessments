function checkEdXDragAndDrop(item){
  item.answers.map((item)=>{
    var correct = item.correct;
    if(item.type == 'key'){

    }
  });
}

function checkEdXNumeric(){
  return this.checkEdX();
}

function checkEdXMultipleChoice(){
  return this.checkEdX();
}

function checkEdX(){
  var result = {
    feedbacks: [],
    score: 0,
    correct: true
  };
  this.get('answers').forEach(function(answer){
    if(answer.get('graded')){
      answer.set('isGraded', false);
      $.each(answer.get('graded'), function(id, graded){
        if(graded.feedback && graded.feedback.length > 0){
          result.feedbacks.push(graded.feedback);
        }
        result.score += graded.score;
        if(!graded.correct){
          result.correct = false;
        }
      });
      answer.set('isGraded', true);
    } else {
      result.correct = false;
    }
  });
  return result;
}

  export default function(item, selectedAnswers){
    var results;
    switch(item.question_type){
      case 'edx_drag_and_drop':
        results = this.checkEdXDragAndDrop(item);
        break;
      case 'edx_numerical_input':
        results = this.checkEdXNumeric();
        break;
      case 'edx_multiple_choice':
        results = this.checkEdXMultipleChoice();
        break;
    }

    return results;
  }

