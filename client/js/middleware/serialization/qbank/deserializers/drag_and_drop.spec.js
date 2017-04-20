import DragAndDrop        from './drag_and_drop';
import genusTypes         from '../../../../constants/genus_types';

describe('drag_and_drop deserializer', () => {
  let item;
  let result;

  beforeEach(() => {
    // item = {
    //   id: 'item01',
    //   type: 'dragAndDrop',
    //   assessmentId: 'assessment01',
    //   bankId: 'bank01',
    //   language: 'english',
    //   name: 'ItemName',
    //   question: {
    //     id: 'question01',
    //     text: 'Answer this question',
    //     type: 'dragAndDrop',
    //     choices: null,
    //     correctFeedback: {
    //       answerId: 'answer01',
    //       text: 'Good Job',
    //       fileIds: {},
    //     },
    //     incorrectFeedback: {
    //       answerId: 'answer02',
    //       text: 'Bad Job',
    //       fileIds: {},
    //     },
    //     target: {
    //       id: 'target01',
    //       image: 'oldTargetImage.png',
    //     },
    //     dropObjects: {
    //       drop01: {
    //         id: 'drop01',
    //         correctZone: 'zone01',
    //         type: 'snap',
    //         image: 'oldImage.png',
    //         label: 'I am the first thing',
    //       },
    //       drop02: {
    //         id: 'drop02',
    //         correctZone: 'zone02',
    //         type: 'drop',
    //         image: 'oldImage.png',
    //         label: 'I am the second thing',
    //       },
    //       drop03: {
    //         id: 'drop03',
    //         correctZone: 'zone03',
    //         type: 'snap',
    //         image: 'oldImage.png',
    //         label: 'I am another thing',
    //       },
    //     },
    //     zones: {
    //       zone01: {
    //         id: 'zone01',
    //         index: 0,
    //         label: '',
    //         type: 'snap',
    //         height: 146,
    //         width: 187.5,
    //         xPos: 505,
    //         yPos: 76,
    //       },
    //       zone02: {
    //         id: 'zone02',
    //         index: 1,
    //         label: '',
    //         type: 'snap',
    //         height: 100,
    //         width: 100,
    //         xPos: 20,
    //         yPos: 20,
    //       },
    //       zone03: {
    //         id: 'zone03',
    //         index: 2,
    //         label: '',
    //         type: 'snap',
    //         height: 30,
    //         width: 60,
    //         xPos: 300,
    //         yPos: 100,
    //       },
    //     },
    //     fileIds: {},
    //     texts: [],
    //     visibleZones: true,
    //   },
    //   originalItem: {},
    // };

    item = {
      answers: [
        {
          assignedBankIds: ['bank01'],
          bankId: 'bank01',
          coordinateConditions: [],
          description: {
            formatTypeId: 'TextFormats%3APLAIN%40okapia.net',
            languageTypeId: '639-2%3AENG%40ISO',
            scriptTypeId: '15924%3ALATN%40ISO',
            text: '',
          },
          displayName: {
            formatTypeId: 'TextFormats%3APLAIN%40okapia.net',
            languageTypeId: '639-2%3AENG%40ISO',
            scriptTypeId: '15924%3ALATN%40ISO',
            text: '',
          },
          feedback: {
            formatTypeId: 'TextFormats%3APLAIN%40okapia.net',
            languageTypeId: '639-2%3AENG%40ISO',
            scriptTypeId: '15924%3ALATN%40ISO',
            text: '',
          },
          feedbacks: [{
            formatTypeId: 'TextFormats%3APLAIN%40okapia.net',
            languageTypeId: '639-2%3AENG%40ISO',
            scriptTypeId: '15924%3ALATN%40ISO',
            text: '',
          }],
          fileIds: {

          },
          genusTypeId: 'answer-type%3Aright-answer%40ODL.MIT.EDU',
          id: 'assessment.Answer%3A58ee8c73c89cd9429cf040f6%40ODL.MIT.EDU',
          recordTypeIds: [
            'answer-record-type%3Amulti-language-answer-with-feedback%40ODL.MIT.EDU',
            'answer-record-type%3Afiles%40ODL.MIT.EDU',
            'answer-record-type%3Adrag-and-drop%40ODL.MIT.EDU'
          ],
          spatialUnitConditions: [],
          type: 'Answer',
          zoneConditions: [{
            droppableId: '58ee8c84c89cd9429bc07304',
            match: true,
            zoneId: '58ee8c73c89cd9429cf040f4',
          }],
        }, {
          assignedBankIds: ['bank01'],
          bankId: 'bank01',
          coordinateConditions: [],
          description: {
            formatTypeId: 'TextFormats%3APLAIN%40okapia.net',
            languageTypeId: '639-2%3AENG%40ISO',
            scriptTypeId: '15924%3ALATN%40ISO',
            text: '',
          },
          displayName: {
            formatTypeId: 'TextFormats%3APLAIN%40okapia.net',
            languageTypeId: '639-2%3AENG%40ISO',
            scriptTypeId: '15924%3ALATN%40ISO',
            text: '',
          },
          feedback: {
            formatTypeId: 'TextFormats%3APLAIN%40okapia.net',
            languageTypeId: '639-2%3AENG%40ISO',
            scriptTypeId: '15924%3ALATN%40ISO',
            text: '',
          },
          feedbacks: [{
            formatTypeId: 'TextFormats%3APLAIN%40okapia.net',
            languageTypeId: '639-2%3AENG%40ISO',
            scriptTypeId: '15924%3ALATN%40ISO',
            text: '',
          }],
          fileIds: {},
          genusTypeId: 'answer-type%3Awrong-answer%40ODL.MIT.EDU',
          id: 'assessment.Answer%3A58ee8c73c89cd9429cf040f6%40ODL.MIT.EDU',
          recordTypeIds: [
            'answer-record-type%3Amulti-language-answer-with-feedback%40ODL.MIT.EDU',
            'answer-record-type%3Afiles%40ODL.MIT.EDU',
            'answer-record-type%3Adrag-and-drop%40ODL.MIT.EDU'
          ],
          spatialUnitConditions: [],
          type: 'Answer',
          zoneConditions: [],
        }
      ],
      assignedBankIds: ['assessment.Bank%3A57e2b4ccc89cd916208d00e1%40ODL.MIT.EDU'],
      bankId: 'assessment.Bank%3A57e2b4ccc89cd916208d00e1%40ODL.MIT.EDU',
      creationTime: {
        day: 12,
        hour: 17,
        microsecond: 139000,
        minute: 38,
        month: 4,
        second: 5,
        year: 2017,
      },
      creatorId: '',
      description: {
        formatTypeId: 'TextFormats%3APLAIN%40okapia.net',
        languageTypeId: '639-2%3AENG%40ISO',
        scriptTypeId: '15924%3ALATN%40ISO',
        text: '',
      },
      descriptions: [],
      displayName: {
        formatTypeId: 'TextFormats%3APLAIN%40okapia.net',
        languageTypeId: '639-2%3AENG%40ISO',
        scriptTypeId: '15924%3ALATN%40ISO',
        text: 'Boop',
      },
      displayNames: [{
        formatTypeId: 'TextFormats%3APLAIN%40okapia.net',
        languageTypeId: '639-2%3AENG%40ISO',
        scriptTypeId: '15924%3ALATN%40ISO',
        text: 'Boop',
      }],
      genusTypeId: 'item-genus-type%3Adrag-and-drop%40ODL.MIT.EDU',
      id: 'assessment.Item%3A58ee65fdc89cd94299786eea%40ODL.MIT.EDU',
      learningObjectiveIds: [],
      maxStringLength: null,
      minStringLength: null,
      provenanceId: '',
      question: {
        assignedBankIds: ['assessment.Bank%3A57e2b4ccc89cd916208d00e1%40ODL.MIT.EDU'],
        bankId: 'assessment.Bank%3A57e2b4ccc89cd916208d00e1%40ODL.MIT.EDU',
        description: {
          formatTypeId: 'TextFormats%3APLAIN%40okapia.net',
          languageTypeId: '639-2%3AENG%40ISO',
          scriptTypeId: '15924%3ALATN%40ISO',
          text: '',
        },
        descriptions: [],
        displayName: {
          formatTypeId: 'TextFormats%3APLAIN%40okapia.net',
          languageTypeId: '639-2%3AENG%40ISO',
          scriptTypeId: '15924%3ALATN%40ISO',
          text: '',
        },
        displayNames: [],
        droppables: [
          {
            dropBehaviorType: 'drop.behavior%3Asnap%40ODL.MIT.EDU',
            id: '58ee8c84c89cd9429bc07304',
            name: '',
            reuse: 1,
            text: '<img alt="" src="image.png"/>',
          },
        //  TODO: put more in here?
        ],
        fileIds: {
        //  some stuff goes here, please don't break
        },
        genusTypeId: 'question-type%3Adrag-and-drop%40ODL.MIT.EDU',
        id: 'assessment.Item%3A58ee65fdc89cd94299786eea%40ODL.MIT.EDU',
        learningObjectiveIds: [],
        multiLanguageDroppables: [
        //  should match droppables, and so forth
        ],
        multiLanguageTargets: [],
        multiLanguageZones: [],
        recordTypeIds: [],
        shuffleDroppables: true,
        shuffleTargets: true,
        shuffleZones: true,
        targets: [{
          dropBehaviorType: 'drop.behavior%3Areject%40ODL.MIT.EDU',
          id: '58ee699dc89cd9429cf03f5d',
          name: '',
          text: '<img alt="" src="targetImage.png"/>',
        }],
        text: {
          formatTypeId: 'TextFormats%3APLAIN%40okapia.net',
          languageTypeId: '639-2%3AENG%40ISO',
          scriptTypeId: '15924%3ALATN%40ISO',
          text: '',
        },
        texts: [],
        type: 'OsidObject',
        zones: [
          {
            containerId: '58ee699dc89cd9429cf03f5d',
            description: 'A new zone',
            dropBehaviorType: 'drop.behavior%3Asnap%40ODL.MIT.EDU',
            id: '58efe526c89cd9559fbcd3e5',
            name: '',
            reuse: 0,
            spatialUnit: {
              coordinateValues: [505, 76],
              height: 146,
              recordTypes: ['osid.mapping.SpatialUnit%3Arectangle%40ODL.MIT.EDU'],
              type: 'SpatialUnit',
              width: 187.5,
            },
            visible: true,
          }, // TODO: add more of these
        ],
      },
      recordTypeIds: [],
      texts: {},
      type: 'Item',
    };

    result = DragAndDrop(item);
  });

  it('does something', () => {
    console.log(result);
    // TODO: add more of these
  });
});
