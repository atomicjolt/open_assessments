import { transformItem as transformQti2 }  from "../qti2/qti";


export function transformItem(item) {
  var qti = transformQti2(item.xml);
  let question_type = item.question_type

  switch(item.json.genusTypeId) {
    case "question-type%3Aqti-order-interaction-mw-sentence%40ODL.MIT.EDU" :
      question_type = "movable_words_sentence";
      break;
    case "question-type%3Aqti-order-interaction-mw-sandbox%40ODL.MIT.EDU" :
      question_type = "movable_words_sandbox";
      break;
    case "question-type%3Aqti-order-interaction-object-manipulation%40ODL.MIT.EDU" :
      question_type = "movable_object_chain";
      break;
    case "question-type%3Aqti-upload-interaction-generic%40ODL.MIT.EDU":
      question_type = "file_upload_question";
      break;
    case "question-type%3Aqti-upload-interaction-audio%40ODL.MIT.EDU":
      question_type = "audio_upload_question";
      break;
  }

  return _.merge({}, qti, { title: item.title, question_type });
};
