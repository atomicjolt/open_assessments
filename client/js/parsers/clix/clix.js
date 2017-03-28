import _ from 'lodash';

import { transformItem as transformQti2 }  from '../qti2/qti';

export function transformDragAndDrop(question) {
  return {
    question_meta: {
      zones: question.zones,
      targets: question.targets,
    },
    question_type: 'clix_drag_and_drop',
    material: question.text,
    isHtml: true,
    answers: question.droppables,
  };
}

export function transformItem(item) {
  switch (item.json.genusTypeId) {
    default:
    case 'question-type%3Adrag-and-drop%40ODL.MIT.EDU': {
      const question = {
        text: '<p>Clix Drag and Drop Question Text</p>',
        zones: [{
          spatialUnit: {
            width: 100,
            coordinateValues: [200, 200],
            recordType: 'osid.mapping.SpatialUnit%3Arectangle%40ODL.MIT.EDU',
            height: 100
          },
          reuse: 0,
          dropBehaviorType: 'drop.behavior%3Asnap%40ODL.MIT.EDU',
          name: 'Zone \xc1',
          visible: false,
          containerId: 0,
          description: 'left of ball'
        }, {
          spatialUnit: {
            width: 100,
            coordinateValues: [100, 100],
            recordType: 'osid.mapping.SpatialUnit%3Arectangle%40ODL.MIT.EDU',
            height: 100
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
          text: '<img src="http://placehold.it/50x50" alt="Green dot" />',
          dropBehaviorType: 'drop.behavior%3Adrop%40ODL.MIT.EDU',
          name: 'Green dot',
          reuse: 2
        }, {
          id: '58d31d7d6bd87136ab09b45e',
          text: '<img src="http://placehold.it/50x50" alt="Red dot" />',
          dropBehaviorType: 'drop.behavior%3Adrop%40ODL.MIT.EDU',
          name: 'Red dot',
          reuse: 4
        }, {
          id: '58d31d7d6bd87136ab09b45e',
          text: '<img src="http://placehold.it/50x50" alt="Red dot" />',
          dropBehaviorType: 'drop.behavior%3Adrop%40ODL.MIT.EDU',
          name: 'Red dot',
          reuse: 4
        }, {
          id: '58d31d7d6bd87136ab09b45e',
          text: '<img src="http://placehold.it/50x50" alt="Red dot" />',
          dropBehaviorType: 'drop.behavior%3Adrop%40ODL.MIT.EDU',
          name: 'Red dot',
          reuse: 4
        }, {
          id: '58d31d7d6bd87136ab09b45e',
          text: '<img src="http://placehold.it/50x50" alt="Red dot" />',
          dropBehaviorType: 'drop.behavior%3Adrop%40ODL.MIT.EDU',
          name: 'Red dot',
          reuse: 4
        }, {
          id: '58d31d7d6bd87136ab09b45e',
          text: '<img src="http://placehold.it/50x50" alt="Red dot" />',
          dropBehaviorType: 'drop.behavior%3Adrop%40ODL.MIT.EDU',
          name: 'Red dot',
          reuse: 4
        }, {
          id: '58d31d7d6bd87136ab09b45e',
          text: '<img src="http://placehold.it/50x50" alt="Red dot" />',
          dropBehaviorType: 'drop.behavior%3Adrop%40ODL.MIT.EDU',
          name: 'Red dot',
          reuse: 4
        }, {
          id: '58d31d7d6bd87136ab09b45e',
          text: '<img src="http://placehold.it/50x50" alt="Red dot" />',
          dropBehaviorType: 'drop.behavior%3Adrop%40ODL.MIT.EDU',
          name: 'Red dot',
          reuse: 4
        }, {
          id: '58d31d7d6bd87136ab09b45e',
          text: '<img src="http://placehold.it/50x50" alt="Red dot" />',
          dropBehaviorType: 'drop.behavior%3Adrop%40ODL.MIT.EDU',
          name: 'Red dot',
          reuse: 4
        }, {
          id: '58d31d7d6bd87136ab09b45e',
          text: '<img src="http://placehold.it/50x50" alt="Red dot" />',
          dropBehaviorType: 'drop.behavior%3Adrop%40ODL.MIT.EDU',
          name: 'Red dot',
          reuse: 4
        }],
        shuffleZones: true,
        targets: [{
          text: '<img src="http://placehold.it/500x500" alt="Ramp" />',
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
      return transformDragAndDrop(question);
    }

    // default: {
    //   const qti = transformQti2(item.xml);
    //   let question_type = item.question_type;
    //   const mapGenusType = {
    //     'question-type%3Aqti-order-interaction-mw-sentence%40ODL.MIT.EDU': 'movable_words_sentence',
    //     'question-type%3Aqti-order-interaction-mw-sandbox%40ODL.MIT.EDU': 'movable_words_sandbox',
    //     'question-type%3Aqti-order-interaction-object-manipulation%40ODL.MIT.EDU': 'movable_object_chain',
    //     'question-type%3Aqti-upload-interaction-generic%40ODL.MIT.EDU': 'file_upload_question',
    //     'question-type%3Aqti-upload-interaction-audio%40ODL.MIT.EDU':'audio_upload_question',
    //     'question-type%3Aqti-numeric-response%40ODL.MIT.EDU': 'numerical_input_question',
    //     'question-type%3Aqti-choice-interaction-survey%40ODL.MIT.EDU': 'survey_question'
    //   };
    //
    //   if (mapGenusType[item.json.genusTypeId]) {
    //     question_type = mapGenusType[item.json.genusTypeId];
    //   }
    //
    //   return _.merge({}, qti, { title: item.title, question_type });
    // }
  }
}
