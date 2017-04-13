import _    from 'lodash';

export const types = {
  item:{
    audioUpload: 'item-genus-type%3Aqti-upload-interaction-audio%40ODL.MIT.EDU',
    dragAndDrop: 'item-genus-type%3Adrag-and-drop%40ODL.MIT.EDU',
    fileUpload: 'item-genus-type%3Aqti-upload-interaction-generic%40ODL.MIT.EDU',
    imageSequence: 'item-genus-type%3Aqti-order-interaction-object-manipulation%40ODL.MIT.EDU',
    movableFillBlank: 'item-genus-type%3Aqti-inline-choice-interaction-mw-fill-in-the-blank%40ODL.MIT.EDU',
    movableWordSandbox: 'item-genus-type%3Aqti-order-interaction-mw-sandbox%40ODL.MIT.EDU',
    movableWordSentence: 'item-genus-type%3Aqti-order-interaction-mw-sentence%40ODL.MIT.EDU',
    multipleAnswer: 'item-genus-type%3Aqti-choice-interaction-multi-select%40ODL.MIT.EDU',
    multipleChoice: 'item-genus-type%3Aqti-choice-interaction%40ODL.MIT.EDU',
    multipleReflection: 'item-genus-type%3Aqti-choice-interaction-multi-select-survey%40ODL.MIT.EDU',
    reflection: 'item-genus-type%3Aqti-choice-interaction-survey%40ODL.MIT.EDU',
    shortAnswer: 'item-genus-type%3Aqti-extended-text-interaction%40ODL.MIT.EDU',
  },
  question: {
    audioUpload: 'question-type%3Aqti-upload-interaction-audio%40ODL.MIT.EDU',
    dragAndDrop: 'question-type%3Adrag-and-drop%40ODL.MIT.EDU',
    fileUpload: 'question-type%3Aqti-upload-interaction-generic%40ODL.MIT.EDU',
    imageSequence: 'question-type%3Aqti-order-interaction-object-manipulation%40ODL.MIT.EDU',
    movableFillBlank: 'question-type%3Aqti-inline-choice-interaction-mw-fill-in-the-blank%40ODL.MIT.EDU',
    movableWordSandbox: 'question-type%3Aqti-order-interaction-mw-sandbox%40ODL.MIT.EDU',
    movableWordSentence: 'question-type%3Aqti-order-interaction-mw-sentence%40ODL.MIT.EDU',
    multipleAnswer: 'question-type%3Aqti-choice-interaction-multi-select%40ODL.MIT.EDU',
    multipleChoice: 'question-type%3Aqti-choice-interaction%40ODL.MIT.EDU',
    multipleReflection: 'question-type%3Aqti-choice-interaction-multi-select-survey%40ODL.MIT.EDU',
    reflection: 'question-type%3Aqti-choice-interaction-survey%40ODL.MIT.EDU',
    shortAnswer: 'question-type%3Aqti-extended-text-interaction%40ODL.MIT.EDU',
  },
  answer: {
    file: 'answer-record-type%3Afiles-submission%40ODL.MIT.EDU', // for any movable word sandbox, audio record tool, and generic file submission
    fillInTheBlank: 'answer-record-type%3Ainline-choice-answer%40ODL.MIT.EDU',
    multipleAnswer: 'answer-record-type%3Amulti-choice-answer%40ODL.MIT.EDU',
    multipleChoice: 'answer-record-type%3Amulti-choice-answer%40ODL.MIT.EDU', // for multiple choice, reflection, movable words, image sequence
    rightAnswer: 'answer-type%3Aright-answer%40ODL.MIT.EDU',
    shortAnswer: 'answer-record-type%3Ashort-text-answer%40ODL.MIT.EDU',
    wrongAnswer: 'answer-type%3Awrong-answer%40ODL.MIT.EDU',
  },
  assets: {
    image: {
      png: 'asset-content-genus-type%3Apng%40iana.org',
      jpg: 'asset-content-genus-type%3Ajpg%40iana.org',
      JPG: 'asset-content-genus-type%3AJPG%40ODL.MIT.EDU',
      svg: 'asset-content-genus-type%3Asvg%40iana.org',
    },
    audio: {
      mp3:'asset-content-genus-type%3Amp3%40iana.org'
    },
    video: {
      m4a: 'asset-content-genus-type%3Am4a%40ODL.MIT.EDU',
      wav: 'asset-content-genus-type%3Awav%40ODL.MIT.EDU',
      mp4: 'asset-content-genus-type%3Amp4%40ODL.MIT.EDU'
    },
    altText: {
      altText: 'asset-content-genus-type%3Aalt-text%40ODL.MIT.EDU',
    },
    description: {
      description: 'asset-content-genus-type%3Amedia-description%40ODL.MIT.EDU',
      oldDesc: 'asset-content-genus-type%3AmediaDescription%40ODL.MIT.EDU',
    },
    license: {
      license: 'someJunkyId',
    },
    copyright: {
      copyright: 'anotherJunkyId'
    },
    vtt: {
      vtt: 'asset-content-genus-type%3Avtt%40ODL.MIT.EDU',
    },
    transcript: {
      transcript: 'asset-content-genus-type%3Atranscript%40ODL.MIT.EDU',
    }
  },
  target: {
    drop: 'drop.behavior%3Adrop%40ODL.MIT.EDU',
    reject: 'drop.behavior%3Areject%40ODL.MIT.EDU',
  },
  zone: {
    drop: 'drop.behavior%3Adrop%40ODL.MIT.EDU',
    snap: 'drop.behavior%3Asnap%40ODL.MIT.EDU',
    rectangle: 'osid.mapping.SpatialUnit%3Arectangle%40ODL.MIT.EDU',
  },
  default: 'GenusType%3ADEFAULT%40DLKIT.MIT.EDU',
};

export function getQbankType(type) {
  return _.findKey(types.item, genusType => type === genusType)
    || _.findKey(types.question, genusType => type === genusType)
    || _.findKey(types.answer, genusType => type === genusType)
    || _.findKey(types.target, genusType => type === genusType)
    || _.findKey(types.zone, genusType => type === genusType)
    || null;
}

export function getQbankMediaType(uglyType) {
  return _.findKey(types.assets, mediaType => _.findKey(mediaType, mType => uglyType === mType) || null) || null;
}

export default types;
