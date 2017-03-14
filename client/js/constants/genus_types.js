export const types = {
  item:{
    multipleChoice: 'item-genus-type%3Aqti-choice-interaction%40ODL.MIT.EDU',
    multipleAnswer: 'item-genus-type%3Aqti-choice-interaction-multi-select%40ODL.MIT.EDU',
    fileUpload: 'item-genus-type%3Aqti-upload-interaction-generic%40ODL.MIT.EDU',
    audioUpload: 'item-genus-type%3Aqti-upload-interaction-audio%40ODL.MIT.EDU',
    shortAnswer: 'item-genus-type%3Aqti-extended-text-interaction%40ODL.MIT.EDU',
    reflection: 'item-genus-type%3Aqti-choice-interaction-survey%40ODL.MIT.EDU',
    multipleReflection: 'item-genus-type%3Aqti-choice-interaction-multi-select-survey%40ODL.MIT.EDU',
    moveableWordSentence: 'item-genus-type%3Aqti-order-interaction-mw-sentence%40ODL.MIT.EDU',
  },
  question: {
    multipleChoice: 'question-type%3Aqti-choice-interaction%40ODL.MIT.EDU',
    audioUpload: 'question-type%3Aqti-upload-interaction-audio%40ODL.MIT.EDU',
    multipleAnswer: 'question-type%3Aqti-choice-interaction-multi-select%40ODL.MIT.EDU',
    reflection: 'question-type%3Aqti-choice-interaction-survey%40ODL.MIT.EDU',
    multipleReflection: 'question-type%3Aqti-choice-interaction-multi-select-survey%40ODL.MIT.EDU',
    fileUpload: 'question-type%3Aqti-upload-interaction-generic%40ODL.MIT.EDU',
    shortAnswer: 'question-type%3Aqti-extended-text-interaction%40ODL.MIT.EDU',
    moveableWordSentence: 'question-type%3Aqti-order-interaction-mw-sentence%40ODL.MIT.EDU',
  },
  answer: {
    rightAnswer: 'answer-type%3Aright-answer%40ODL.MIT.EDU',
    wrongAnswer: 'answer-type%3Awrong-answer%40ODL.MIT.EDU',
    multipleChoice: 'answer-record-type%3Amulti-choice-answer%40ODL.MIT.EDU', // for multiple choice, reflection, moveable words, image sequence
    multipleAnswer: 'answer-record-type%3Amulti-choice-answer%40ODL.MIT.EDU',
    fillInTheBlank: 'answer-record-type%3Ainline-choice-answer%40ODL.MIT.EDU',
    file: 'answer-record-type%3Afiles-submission%40ODL.MIT.EDU', // for any moveable word sandbox, audio record tool, and generic file submission
    shortAnswer: 'answer-record-type%3Ashort-text-answer%40ODL.MIT.EDU',
  },
  default: 'GenusType%3ADEFAULT%40DLKIT.MIT.EDU',
};

export function getQbankType(type) {
  return _.findKey(types.item, genusType => type === genusType) || null;
}

export default types;
