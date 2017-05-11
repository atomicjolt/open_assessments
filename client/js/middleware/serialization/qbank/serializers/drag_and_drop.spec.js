
import dragAndDrop        from './drag_and_drop';
import genusTypes         from '../../../../constants/genus_types';
import { languages }      from '../../../../constants/language_types';

describe('drag_and_drop serializer', () => {
  let item;
  let newItem;
  let result;

  beforeEach(() => {
    item = {
      id: 'item01',
      type: 'dragAndDrop',
      assessmentId: 'assessment01',
      bankId: 'bank01',
      language: 'english',
      name: 'ItemName',
      question: {
        id: 'question01',
        text: 'Answer this question',
        type: 'dragAndDrop',
        choices: null,
        correctFeedback: {
          answerId: 'answer01',
          text: 'Good Job',
          fileIds: {},
        },
        incorrectFeedback: {
          answerId: 'answer02',
          text: 'Bad Job',
          fileIds: {},
        },
        target: {
          id: 'target01',
          image: 'oldTargetImage.png',
        },
        dropObjects: {
          drop01: {
            id: 'drop01',
            correctZone: 'zone01',
            type: 'snap',
            image: 'oldImage.png',
            images: {
              [languages.languageTypeId.english]: {
                text: 'oldImage.png'
              }
            },
            label: 'I am the first thing',
          },
          drop02: {
            id: 'drop02',
            correctZone: 'zone02',
            type: 'drop',
            image: 'oldImage.png',
            images: {
              [languages.languageTypeId.english]: {
                text: 'oldImage.png'
              }
            },
            label: 'I am the second thing',
          },
          drop03: {
            id: 'drop03',
            correctZone: 'zone03',
            type: 'snap',
            image: 'oldImage.png',
            images: {
              [languages.languageTypeId.english]: {
                text: 'oldImage.png'
              }
            },
            label: 'I am another thing',
          },
        },
        zones: {
          zone01: {
            id: 'zone01',
            index: 0,
            label: '',
            type: 'snap',
            height: 146,
            width: 187.5,
            xPos: 505,
            yPos: 76,
          },
          zone02: {
            id: 'zone02',
            index: 1,
            label: '',
            type: 'snap',
            height: 100,
            width: 100,
            xPos: 20,
            yPos: 20,
          },
          zone03: {
            id: 'zone03',
            index: 2,
            label: '',
            type: 'snap',
            height: 30,
            width: 60,
            xPos: 300,
            yPos: 100,
          },
        },
        fileIds: {},
        texts: [],
        visibleZones: true,
      },
      originalItem: {},
    };

    newItem = {
      id: 'item01',
      question: {
        language: languages.languageTypeId.english,
      },
      language: languages.languageTypeId.english,
    };

    result = dragAndDrop(item, newItem);
  });

  it('accepts original item and newItemAttr', () => {
    expect(result.name).toBe('ItemName');
  });

  it('question attributes correct', () => {
    expect(result.question.id).toBe('question01');
    expect(result.question.genusTypeId).toBe(genusTypes.question.dragAndDrop);
  });

  it('choices shouldnt be sent up', () => {
    expect(result.question.choices).toBe(undefined);
  });

  it('fields undefined if not sent up', () => {
    expect(result.question.targets).toBe(undefined);
    expect(result.question.droppables).toBe(undefined);
    expect(result.question.zones).toBe(undefined);
    //
  });

  it('targets', () => {
    newItem = {
      id: 'item01',
      question: {
        target: {
          id: 'target01',
          text: 'newTargetImage.png',
        }
      },
    };

    result = dragAndDrop(item, newItem);
    expect(result.question.targets[0].text.text).toContain('<img src="newTargetImage.png" alt=');
    expect(result.question.targets[0].dropBehaviorType).toBe(genusTypes.target.reject);
  });

  it('updates droppables', () => {
    newItem = {
      id: 'item01',
      question: {
        dropObjects: {
          drop01: {
            id: 'drop01',
            image: 'newImage.png',
            images: {
              [languages.languageTypeId.english]: { text: 'newImage.png' }
            }
          }
        }
      },
      language: languages.languageTypeId.english
    };

    result = dragAndDrop(item, newItem);
    expect(result.question.droppables[0].text.text).toContain('<img src="newImage.png" alt=');
  });

  it('creates a new droppables', () => {
    newItem = {
      id: 'item01',
      question: {
        dropObjects: {
          new: {
            text: 'newImage.png',
            altText: 'I am the Image',
          }
        }
      },
    };

    result = dragAndDrop(item, newItem);
    expect(result.question.droppables[3].text.text).toContain('<img src="newImage.png" alt=');
    expect(result.question.droppables[3].dropBehaviorType).toBe(genusTypes.zone.snap);
  });

  it('zones', () => {
    newItem = {
      id: 'item01',
      question: {
        zones: {
          zone01: {
            height: 111,
            width: 117,
            xPos: 208,
            yPos: 83,
          }
        }
      },
    };

    result = dragAndDrop(item, newItem);
    expect(result.question.zones[0].spatialUnit.height).toBe(111);
    expect(result.question.zones[0].spatialUnit.width).toBe(117);
    expect(result.question.zones[0].spatialUnit.coordinateValues[0]).toBe(208);
    expect(result.question.zones[0].spatialUnit.coordinateValues[1]).toBe(83);
    expect(result.question.zones[0].spatialUnit.recordType).toBe(genusTypes.zone.rectangle);
    expect(result.question.zones[0].dropBehaviorType).toBe(genusTypes.zone.snap);
  });

  it('answers', () => {
    newItem = {
      id: 'item01',
      question: {
        zones: {
          zone01: {
            height: 111,
            width: 117,
            xPos: 208,
            yPos: 83,
          }
        }
      },
    };

    result = dragAndDrop(item, newItem);
    expect(result.answers.length).toBe(2);
    expect(result.answers[0].genusTypeId).toBe(genusTypes.answer.rightAnswer);
    expect(result.answers[0].zoneConditions.length).toBe(3);
    expect(result.answers[0].zoneConditions[0].droppableId).toBe('drop01');
    expect(result.answers[0].zoneConditions[0].zoneId).toBe('zone01');
  });
});
