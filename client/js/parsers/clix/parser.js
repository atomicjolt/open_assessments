import $  from 'jquery';

import { AssessmentFormats }  from '../assessment.js';
import Qti2Parser             from '../qti2/parser.js';
import { transformDragAndDrop }   from './clix';

export default class Parser {

  static parse(assessmentId, json) {
    const items = json.data.map((j) => {
      let parsed = {};
      let question;
      switch (j.genusTypeId) {
        case 'question-type%3Adrag-and-drop%40ODL.MIT.EDU':
        default:
          question = {
            text: '<p>Hello World</p>',
            zones: [{
              spatialUnit: {
                width: 50,
                coordinateValues: [0, 0],
                recordType: 'osid.mapping.SpatialUnit%3Arectangle%40ODL.MIT.EDU',
                height: 30
              },
              reuse: 0,
              dropBehaviorType: 'drop.behavior%3Asnap%40ODL.MIT.EDU',
              name: 'Zone \xc1',
              visible: false,
              containerId: 0,
              description: 'left of ball'
            }, {
              spatialUnit: {
                width: 30,
                coordinateValues: [100, 100],
                recordType: 'osid.mapping.SpatialUnit%3Arectangle%40ODL.MIT.EDU',
                height: 50
              },
              reuse: 2,
              dropBehaviorType: 'drop.behavior%3Adrop%40ODL.MIT.EDU',
              name: 'Zone \u092c\u0940',
              visible: true,
              containerId: 0,
              description: 'right of ball'
            }],
            shuffleTargets: false,
            genusTypeId: 'question-type%3Adrag-and-drop%40ODL.MIT.EDU',
            shuffleDroppables: true,
            droppables: [{
              id: '58d31d7d6bd87136ab09b45d',
              text: '<p><img src="http://www.example.com/draggable_green_dot_png" alt="Green dot" /></p>',
              dropBehaviorType: 'drop.behavior%3Adrop%40ODL.MIT.EDU',
              name: 'Green dot',
              reuse: 1
            }, {
              id: '58d31d7d6bd87136ab09b45e',
              text: '<p><img src="http://www.example.com/draggable_red_dot_png" alt="Red dot" /></p>',
              dropBehaviorType: 'drop.behavior%3Adrop%40ODL.MIT.EDU',
              name: 'Red dot',
              reuse: 4
            }],
            shuffleZones: true,
            targets: [{
              text: '<p><img src="http://www.example.com/drag_and_drop_input_DPP-Concpt-BlkonRmp-Trgt_png" alt="Ramp" /></p>',
              name: 'Image of ramp',
              dropBehaviorType: 'drop.behavior%3Areject%40ODL.MIT.EDU'
            }],
            fileIds: {
              'drag_and_drop_input_DPP-Concpt-BlkonRmp-Trgt_png': {
                assetId: 'repository.Asset%3A58cbfbde2a0cedc148a7630c%40ODL.MIT.EDU',
                assetContentTypeId: 'asset-content-genus-type%3Apng%40iana.org',
                assetContentId: 'repository.AssetContent%3A58cbfbde2a0cedc148a7630e%40ODL.MIT.EDU'
              },
              draggable_red_dot_png: {
                assetId: 'repository.Asset%3A58cbfbde2a0cedc148a76312%40ODL.MIT.EDU',
                assetContentTypeId: 'asset-content-genus-type%3Apng%40iana.org',
                assetContentId: 'repository.AssetContent%3A58cbfbde2a0cedc148a76314%40ODL.MIT.EDU'
              },
              draggable_green_dot_png: {
                assetId: 'repository.Asset%3A58cbfbde2a0cedc148a7630f%40ODL.MIT.EDU',
                assetContentTypeId: 'asset-content-genus-type%3Apng%40iana.org',
                assetContentId: 'repository.AssetContent%3A58cbfbde2a0cedc148a76311%40ODL.MIT.EDU'
              }
            }
          };
          return { ...transformDragAndDrop(question), json: question };
        // default:
        //   parsed = Qti2Parser.parseItem($($.parseXML(j.qti)).find('>')[0]);
        // return Object.assign(parsed, {
        //   json: j
        // });
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
    // Don't return any feedback when no feedback is available
  } else {
    console.error('We cannot recognize feedback from server');
  }
}
