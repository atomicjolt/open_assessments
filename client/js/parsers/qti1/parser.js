import $                     from 'jquery';
import Qti                   from './qti';
import { AssessmentFormats } from '../assessment';

export default class Parser{

  static parse(assessmentId, assessmentXml, xml){
    var assessment = {
      id           : assessmentXml.attr('ident'),
      title        : assessmentXml.attr('title'),
      standard     : AssessmentFormats.Qti1,
      assessmentId : assessmentId,
    };
    assessment.objectives = xml.find('assessment > objectives matref').map((index, item) => {
      return $(item).attr('linkrefid');
    });
    assessment.sections = this.parseSections(xml);
    return assessment;
  }

  static parseSections(xml){

    var fromXml = (xml) => {
      xml = $(xml);
      return {
        id       : xml.attr('ident'),
        standard : AssessmentFormats.Qti1,
        xml      : xml,
        outcome  : this.parseOutcome(xml),
        items    : this.parseItems(xml)
      };
    };

    // Not all QTI files have sections. If we don't find one we build a default one to contain the items from the QTI file.
    var buildDefault = (xml) => {
      return {
        id       : 'default',
        standard : AssessmentFormats.Qti1,
        xml      : xml,
        items    : this.parseItems(xml)
      };
    };

    return this.listFromXml(xml, 'section', fromXml, buildDefault);

  }

  static parseOutcome(xml){
    xml = $(xml);
    if(xml.attr("ident") == "root_section"){
      return "root section";
    }
    var item = xml.find("item")[0];
    var fields = $(item).find("qtimetadatafield");
    var outcome = {
      shortOutcome: "",
      longOutcome: "",
      outcomeGuid: "",
    };

    for (var i = fields.length - 1; i >= 0; i--) {
      if($(fields[i]).find("fieldlabel").text() == "outcome_guid"){
        outcome.outcomeGuid = $(fields[i]).find("fieldentry").text();
      }
      if($(fields[i]).find("fieldlabel").text() == "outcome_long_title"){
        outcome.longOutcome = $(fields[i]).find("fieldentry").text();
      }
      if($(fields[i]).find("fieldlabel").text() == "outcome_short_title"){
        outcome.shortOutcome = $(fields[i]).find("fieldentry").text();
      }
    };
    return outcome;
  }

  static parseItems(xml){

    var fromXml = (xml) => {
      xml = $(xml);

      var objectives = xml.find('objectives matref').map((index, item) => {
        return $(item).attr('linkrefid');
      });
      var outcomes = {
        shortOutcome: "",
        longOutcome: ""
      };
      xml.find("fieldentry").map((index, outcome)=>{
        if(index == 2){
          outcomes.shortOutcome = outcome.textContent;
        }
        if(index == 3){
          outcomes.longOutcome = outcome.textContent;
        }
      });
      var item = {
        id         : xml.attr('ident'),
        title      : xml.attr('title'),
        objectives : objectives,
        outcomes   : outcomes,
        xml        : xml,
        material   : this.material(xml),
        answers    : this.parseAnswers(xml),
        correct    : this.parseCorrect(xml),
        timeSpent  : 0
      };
      $.each(xml.find('itemmetadata > qtimetadata > qtimetadatafield'), function(i, x){
        item[$(x).find('fieldlabel').text()] = $(x).find('fieldentry').text();
      });

      if(xml.find('itemmetadata > qmd_itemtype').text() === 'Multiple Choice'){
        item.question_type = 'multiple_choice_question';
      }

      var response_grp = xml.find('response_grp');
      if(response_grp){
        if(response_grp.attr('rcardinality') === 'Multiple'){
          item.question_type = 'drag_and_drop';
        }
      }

      return item;
    };

    // Only grab the items at the current level of the tree
    return this.listFromXml(xml, '> item', fromXml);

  }

  static parseCorrect(xml){
    var respconditions = xml.find("respcondition");
    var correctAnswers = [];
    for (var i=0; i<respconditions.length; i++){
      var condition = $(respconditions[i]);
      if(condition.find('setvar').text() != '0'){
        var answer = {
          id: condition.find('conditionvar > varequal').text(),
          value: condition.find('setvar').text()
        };
        if(answer.id == ""){
          answer.id = condition.find('conditionvar > and > varequal').map((index, condition) => {
            condition = $(condition);
            return condition.text();
          });
          answer.id = answer.id.toArray();
        }
        correctAnswers.push(answer);
      }
    }
    return correctAnswers;
  }

  static parseAnswers(xml){

    var fromXml = (xml) => {
      xml = $(xml);
      var matchMaterial = xml.parent().parent().find('material')[0].textContent.trim();
      var answer = {
        id            : xml.attr('ident'),
        material      : this.buildMaterial(xml.find('material').children()),
        matchMaterial : matchMaterial,
        xml           : xml,
        feedback      : this.parseFeedback(xml)
      };
      return answer;
    };

    return this.listFromXml(xml, 'response_lid > render_choice > response_label', fromXml);

  }

  // Process nodes based on QTI spec here:
  // http://www.imsglobal.org/question/qtiv1p2/imsqti_litev1p2.html#1404782
  static buildMaterial(nodes){
    var result = '';
    $.each(nodes, function(i, item){
      var parsedItem = $(item);
      switch(item.nodeName.toLowerCase()){
        case 'mattext':
          // TODO both mattext and matemtext have a number of attributes that can be used to display the contents
          result += parsedItem.text();
          break;
        case 'matemtext':
          // TODO figure out how to 'emphasize' text
          result += parsedItem.text();
          break;
        case 'matimage':
          result += '<img src="' + parsedItem.attr('uri') + '"';
          if(parsedItem.attr('label')) { result += 'alt="' + parsedItem.attr('label') + '"'; }
          if(parsedItem.attr('width')) { result += 'width="' + parsedItem.attr('width') + '"'; }
          if(parsedItem.attr('height')){ result += 'height="' + parsedItem.attr('height') + '"'; }
          result += ' />';
          break;
        case 'matref':
          var linkrefid = $(item).attr('linkrefid');
          // TODO figure out how to look up material based on linkrefid
          break;
      }
    });

    return result;
  }

  static listFromXml(xml, selector, fromXml, buildDefault){
    xml = $(xml);
    var list = xml.find(selector).map((i, x) => {
      return fromXml(x);
    }).toArray(); // Make sure we have a normal javascript array not a jquery array.
    if(list.length <= 0 && buildDefault){
      list = [buildDefault(xml)];
    }
    return list;
  }

  // //////////////////////////////////////////////////////////
  // Item related functionality
  //
  static buildResponseGroup(node){
    // TODO this is an incomplete attempt to build a drag and drop
    // question type based on the drag_and_drop.xml in seeds/qti
    return this.buildMaterial($(node).find('material').children());
  }

  static material(xml){

    var material = xml.find('presentation > material').children();
    if(material.length > 0){
      return this.buildMaterial(material);
    }

    var flow = xml.find('presentation > flow');
    if(flow.length > 0){
      return this.reduceFlow(flow);
    }

  }

  static reduceFlow(flow){
    var result = '';
    $.each(flow.children(), function(i, node){
      if(node.nodeName.toLowerCase() === 'flow'){
        result += Qti.buildMaterial($(node).find('material').children());
      } else if(node.nodeName.toLowerCase() === 'response_grp'){
        result += Qti.buildResponseGroup(node);
      }
    });
    return result;
  }

  static parseFeedback(xml){
    return {
      // See code below and drupal.xml for an example
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
