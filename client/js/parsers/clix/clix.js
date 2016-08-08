import { transformItem as transformQti2 }  from "../qti2/qti";


export function transformItem(item) {
  var qti = transformQti2(item.xml);
  let question_type = item.question_type;

  const mapGenusType = {
    ['question-type%3Aqti-order-interaction-mw-sentence%40ODL.MIT.EDU']: 'movable_words_sentence',
    ['question-type%3Aqti-order-interaction-mw-sandbox%40ODL.MIT.EDU']: 'movable_words_sandbox',
    ['question-type%3Aqti-order-interaction-object-manipulation%40ODL.MIT.EDU']: 'movable_object_chain',
    ['question-type%3Aqti-upload-interaction-generic%40ODL.MIT.EDU']: 'file_upload_question',
    ['question-type%3Aqti-upload-interaction-audio%40ODL.MIT.EDU']:'audio_upload_question'
  };

  if(mapGenusType[item.json.genusTypeId]) {
    question_type = mapGenusType[item.json.genusTypeId];
  }
  return _.merge({}, qti, { title: item.title, question_type });
};
