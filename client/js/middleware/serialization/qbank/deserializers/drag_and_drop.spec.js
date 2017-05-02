import _                  from 'lodash';
import dragAndDrop        from './drag_and_drop';
import { languages }      from '../../../../constants/language_types';

describe('drag_and_drop deserializer', () => {
  let item;
  let result;

  beforeEach(() => {
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
            droppableId: 'drop01',
            match: true,
            zoneId: 'zone01',
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
            id: 'drop01',
            name: 'drop the beat',
            reuse: 1,
            text: '<img alt="" src="image01.png"/>',
          }, {
            dropBehaviorType: 'drop.behavior%3Asnap%40ODL.MIT.EDU',
            id: 'drop02',
            name: '',
            reuse: 1,
            text: '<img alt="" src="image02.png"/>',
          }, {
            dropBehaviorType: 'drop.behavior%3Asnap%40ODL.MIT.EDU',
            id: 'drop03',
            name: '',
            reuse: 1,
            text: '<img alt="" src="image03.png"/>',
          }, {
            dropBehaviorType: 'drop.behavior%3Asnap%40ODL.MIT.EDU',
            id: 'drop04',
            name: '',
            reuse: 1,
            text: '<img alt="" src="image04.png"/>',
          },
        ],
        fileIds: {
        //  some stuff goes here, please don't break
        },
        genusTypeId: 'question-type%3Adrag-and-drop%40ODL.MIT.EDU',
        id: 'assessment.Item%3A58ee65fdc89cd94299786eea%40ODL.MIT.EDU',
        learningObjectiveIds: [],
        multiLanguageDroppables: [
          {
            dropBehaviorType: 'drop.behavior%3Asnap%40ODL.MIT.EDU',
            id: 'drop01',
            name: 'drop the beat',
            names: [{
              languageTypeId: languages.languageTypeId.english,
              text: 'drop the beat'
            }],
            reuse: 1,
            text: '<img alt="" src="image01.png"/>',
            texts: [{
              languageTypeId: languages.languageTypeId.english,
              text: '<img alt="" src="image01.png"/>',
            }]
          }, {
            dropBehaviorType: 'drop.behavior%3Asnap%40ODL.MIT.EDU',
            id: 'drop02',
            name: '',
            names: [{
              languageTypeId: languages.languageTypeId.english,
              text: ''
            }],
            reuse: 1,
            text: '<img alt="" src="image02.png"/>',
            texts: [{
              languageTypeId: languages.languageTypeId.english,
              text: '<img alt="" src="image02.png"/>',
            }]
          }, {
            dropBehaviorType: 'drop.behavior%3Asnap%40ODL.MIT.EDU',
            id: 'drop03',
            name: '',
            names: [{
              languageTypeId: languages.languageTypeId.english,
              text: ''
            }],
            reuse: 1,
            text: '<img alt="" src="image03.png"/>',
            texts: [{
              languageTypeId: languages.languageTypeId.english,
              text: '<img alt="" src="image03.png"/>',
            }]
          }, {
            dropBehaviorType: 'drop.behavior%3Asnap%40ODL.MIT.EDU',
            id: 'drop04',
            name: '',
            names: [{
              languageTypeId: languages.languageTypeId.english,
              text: ''
            }],
            reuse: 1,
            text: '<img alt="" src="image04.png"/>',
            texts: [{
              languageTypeId: languages.languageTypeId.english,
              text: '<img alt="" src="image04.png"/>',
            }]
          },
        ],
        multiLanguageTargets: [{
          dropBehaviorType: 'drop.behavior%3Areject%40ODL.MIT.EDU',
          id: 'target01',
          name: '',
          text: '<img alt="" src="targetImage.png"/>',
          texts: [{
            languageTypeId: languages.languageTypeId.english,
            text: '<img alt="" src="targetImage.png"/>'
          }]
        }],
        multiLanguageZones: [{
          containerId: 'target01',
          description: 'A new zone',
          dropBehaviorType: 'drop.behavior%3Asnap%40ODL.MIT.EDU',
          id: 'zone01',
          name: 'I am the zoniest',
          names: [{
            languageTypeId: languages.languageTypeId.english,
            text: 'I am the zoniest'
          }],
          reuse: 0,
          spatialUnit: {
            coordinateValues: [505, 76],
            height: 146,
            recordTypes: ['osid.mapping.SpatialUnit%3Arectangle%40ODL.MIT.EDU'],
            type: 'SpatialUnit',
            width: 187.5,
          },
          visible: true,
        }, {
          containerId: 'target01',
          description: 'Another new zone',
          dropBehaviorType: 'drop.behavior%3Asnap%40ODL.MIT.EDU',
          id: 'zone02',
          name: '',
          reuse: 0,
          spatialUnit: {
            coordinateValues: [200, 200],
            height: 20,
            recordTypes: ['osid.mapping.SpatialUnit%3Arectangle%40ODL.MIT.EDU'],
            type: 'SpatialUnit',
            width: 103,
          },
          visible: true,
        }, {
          containerId: 'target01',
          description: 'A third zone',
          dropBehaviorType: 'drop.behavior%3Asnap%40ODL.MIT.EDU',
          id: 'zone03',
          name: '',
          reuse: 0,
          spatialUnit: {
            coordinateValues: [600, 10],
            height: 3,
            recordTypes: ['osid.mapping.SpatialUnit%3Arectangle%40ODL.MIT.EDU'],
            type: 'SpatialUnit',
            width: 90,
          },
          visible: true,
        }],
        recordTypeIds: [],
        shuffleDroppables: true,
        shuffleTargets: true,
        shuffleZones: true,
        targets: [{
          dropBehaviorType: 'drop.behavior%3Areject%40ODL.MIT.EDU',
          id: 'target01',
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
            containerId: 'target01',
            description: 'A new zone',
            dropBehaviorType: 'drop.behavior%3Asnap%40ODL.MIT.EDU',
            id: 'zone01',
            name: 'I am the zoniest',
            reuse: 0,
            spatialUnit: {
              coordinateValues: [505, 76],
              height: 146,
              recordTypes: ['osid.mapping.SpatialUnit%3Arectangle%40ODL.MIT.EDU'],
              type: 'SpatialUnit',
              width: 187.5,
            },
            visible: true,
          }, {
            containerId: 'target01',
            description: 'Another new zone',
            dropBehaviorType: 'drop.behavior%3Asnap%40ODL.MIT.EDU',
            id: 'zone02',
            name: '',
            reuse: 0,
            spatialUnit: {
              coordinateValues: [200, 200],
              height: 20,
              recordTypes: ['osid.mapping.SpatialUnit%3Arectangle%40ODL.MIT.EDU'],
              type: 'SpatialUnit',
              width: 103,
            },
            visible: true,
          }, {
            containerId: 'target01',
            description: 'A third zone',
            dropBehaviorType: 'drop.behavior%3Asnap%40ODL.MIT.EDU',
            id: 'zone03',
            name: '',
            reuse: 0,
            spatialUnit: {
              coordinateValues: [600, 10],
              height: 3,
              recordTypes: ['osid.mapping.SpatialUnit%3Arectangle%40ODL.MIT.EDU'],
              type: 'SpatialUnit',
              width: 90,
            },
            visible: true,
          },
        ],
      },
      recordTypeIds: [],
      texts: {},
      type: 'Item',
    };

    result = dragAndDrop(item);
  });

  it('builds the question correctly', () => {
    expect(result.question).toBeDefined();
    expect(result.question.target).toBeDefined();
    expect(result.question.zones).toBeDefined();
    expect(result.question.visibleZones).toBeDefined();
    expect(result.question.dropObjects).toBeDefined();
    expect(result.question.correctFeedback).toBeDefined();
    expect(result.question.incorrectFeedback).toBeDefined();
  });

  it('makes the target', () => {
    const target = result.question.target;
    expect(target.id).toBe('target01');
    expect(target.image).toBe('targetImage.png');
  });

  it('makes the zones', () => {
    const zones = result.question.zones;
    expect(_.size(zones)).toBe(3);
    expect(zones.zone01).toBeDefined();
    expect(zones.zone01.id).toBe('zone01');
    expect(zones.zone01.label).toBe('I am the zoniest');
    expect(zones.zone01.height).toBe(146);
    expect(zones.zone01.width).toBe(187.5);
    expect(zones.zone01.xPos).toBe(505);
    expect(zones.zone01.yPos).toBe(76);
    expect(zones.zone01.type).toBe('snap');
  });

  it('makes the dropObjects', () => {
    const drops = result.question.dropObjects;
    expect(_.size(drops)).toBe(4);
    expect(drops.drop01).toBeDefined();
    expect(drops.drop01.id).toBe('drop01');
    expect(drops.drop01.labels[languages.languageTypeId.english].text).toBe('drop the beat');
    expect(drops.drop01.image).toBe('image01.png');
    expect(drops.drop01.type).toBe('snap');
    expect(drops.drop01.correctZone).toBe('zone01');
  });
});
