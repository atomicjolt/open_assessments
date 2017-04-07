import $  from 'jquery';

import { AssessmentFormats }  from '../assessment.js';
import Qti2Parser             from '../qti2/parser.js';

export default class Parser {

  static parse(assessmentId, json) {
    const items = json.data.map((j) => {
      let parsed = {};
      switch (j.genusTypeId) {
        case 'question-type%3Adrag-and-drop%40ODL.MIT.EDU':
          return { ...j, json: j };

        default:
          parsed = Qti2Parser.parseItem($($.parseXML(j.qti)).find('>')[0]);
          return Object.assign(parsed, {
            json: j
          });
      }
    });

    return {
      standard: AssessmentFormats.CLIx,
      id: assessmentId,
      requireNAnswers: json.nOfM,
      items
    };
  }
}

export function parseFeedback(feedbackXml) {
  if (feedbackXml.startsWith('<?xml')) {
    const xml = $.parseXML(feedbackXml);
    const $xml = $(xml);
    const feedback = $xml.find('modalFeedback');
    return feedback.html();
  } else if (feedbackXml === 'No feedback available.') {
    return '';
    // Don't return any feedback when no feedback is available
  }

  console.error('We cannot recognize feedback from server'); // eslint-disable-line no-console
  return '';
}
