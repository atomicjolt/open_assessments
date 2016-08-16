import $  from "jquery";

import { AssessmentFormats }  from "../assessment.js";
import Qti2Parser             from "../qti2/parser.js";


export default class Parser {

  static parse(assessmentId, json) {
    var items = json.data.map((j) => {
      var parsed = Qti2Parser.parseItem($($.parseXML(j.qti)).find(">")[0]);
      return Object.assign(parsed, {
        json: j
      });
    });

    return {
      standard: AssessmentFormats.CLIx,
      id: assessmentId,
      requireNAnswers: json.nOfM,
      items
    };
  }
};

export function parseFeedback(feedbackXml){
  if(feedbackXml.startsWith('<?xml')){
    var xml = $.parseXML(feedbackXml);
    var $xml = $(xml);
    var feedback = $xml.find('modalFeedback');
    return feedback.html();
  } else if(feedbackXml === "No feedback available."){
    // Don't return any feedback when no feedback is available
  } else {
    console.error("We cannot recognize feedback from server");
  }

}
