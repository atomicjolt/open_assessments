export const types = {
  item:{
    multipleChoice: 'item-genus-type%3Aqti-choice-interaction%40ODL.MIT.EDU',
    fileUpload: 'item-genus-type%3Aqti-upload-interaction-generic%40ODL.MIT.EDU',
    audioUpload: 'item-genus-type%3Aqti-upload-interaction-audio%40ODL.MIT.EDU',
    shortAnswer: 'item-genus-type%3Aqti-extended-text-interaction%40ODL.MIT.EDU',
    singleReflection: 'item-genus-type%3Aqti-choice-interaction-survey%40ODL.MIT.EDU',
    multiReflection: 'item-genus-type%3Aqti-choice-interaction-multi-select-survey%40ODL.MIT.EDU',
  },
  question: {
    audioUpload: 'question-type%3Aqti-upload-interaction-audio%40ODL.MIT.EDU',
    singeReflection: 'question-type%3Aqti-choice-interaction-survey%40ODL.MIT.EDU',
    multiReflections: 'question-type%3Aqti-choice-interaction-multi-select-survey%40ODL.MIT.EDU',
    fileUpload: 'question-type%3Aqti-upload-interaction-generic%40ODL.MIT.EDU',
  },
  answer: {
    rightAnswer: 'answer-type%3Aright-answer%40ODL.MIT.EDU',
    wrongAnswer: 'answer-type%3Awrong-answer%40ODL.MIT.EDU',
    multipleChoice: 'answer-record-type%3Amulti-choice-answer%40ODL.MIT.EDU', // for multiple choice, reflection, moveable words, image sequence
    fillInTheBlank: 'answer-record-type%3Ainline-choice-answer%40ODL.MIT.EDU',
    file: 'answer-record-type%3Afiles-submission%40ODL.MIT.EDU', // for any moveable word sandbox, audio record tool, and generic file submission
    shortAnswer: 'answer-record-type%3Ashort-text-answer%40ODL.MIT.EDU',
  },
  default: 'GenusType%3ADEFAULT%40DLKIT.MIT.EDU',
};

export function getQbankType(type) {
  return _.findKey(types.item, (genusType) => type === genusType) || null;
}

export default types;
