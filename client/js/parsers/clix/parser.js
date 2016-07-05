import $  from "jquery";

import { AssessmentFormats }  from "../assessment.js";
import Qti2Parser             from "../qti2/parser.js";


export default class Parser {

  static parse(assessmentId, json) {
    var jsonItems = JSON.parse(json);
    var items = jsonItems.map((j) => {
      var parsed = Qti2Parser.parseItem($($.parseXML(j.qti)).find(">")[0]);
      return Object.assign(parsed, {
        json: j
      });
    });

    return {
      standard: AssessmentFormats.CLIx,
      id: assessmentId,
      items
    };
  }
};

export function parseFeedback(feedbackXml){
  var xml = $(feedbackXml);
  return xml.html();
}
