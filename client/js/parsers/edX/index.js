import EdX                from './edX/edx';
import EdXSection         from './edX/edx_section';
import EdXItem            from './edX/edx_item';
import AssessmentActions  from "../actions/assessment";

export default class Assessment{

  static parseEdX(settings, sequential){
    var url = settings.srcUrl;
    var id  = url.slice(url.indexOf('sequential')).replace('.xml', '');
    var assessment = {
      id       : id,
      title    : sequential.attr('display_name'),
      standard : 'edX'
    };

    // Add ids for the sections before returning the assessment so that we can order them
    assessment.sections = EdX.idPlaceholders(
      EdX.ensureIds('edx_sequential_', sequential.children()) // Ensure every child has an id
    );

    var baseUrl = url.substr(0, url.indexOf('sequential'));
    EdX.crawlEdX(sequential.children(), baseUrl + 'vertical/', settings, function(id, url, res){
      var section = EdXSection.fromEdX(id, url, res);
      var children = section.xml.children();
      section.items = EdX.idPlaceholders(
        EdX.ensureIds('edx_item_', children) // Ensure every child has an id
      );
      AssessmentActions.edXLoadSection(section);
      EdX.crawlEdX(children, baseUrl + 'problem/', settings, function(id, url, res){
        var item = EdXItem.fromEdX(id, url, res);
        AssessmentActions.edXLoadItem(item);
      }.bind(this));

    }.bind(this));
    return assessment;
  }

  static checkAnswer(item, selectedAnswers){
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

  static checkEdXDragAndDrop(item){
    item.answers.map((item)=>{
      var correct = item.correct;
      if(item.type == 'key'){

      }
    });
    //debugger;
  }

  static checkEdXNumeric(){
    return this.checkEdX();
  }

  static checkEdXMultipleChoice(){
    return this.checkEdX();
  }

  static checkEdX(){
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

}