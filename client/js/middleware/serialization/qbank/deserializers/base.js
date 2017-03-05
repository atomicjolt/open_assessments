import _                    from 'lodash';
import { getQbankType }     from '../../../../constants/genus_types';
import { getLanguage }      from '../../../../constants/language_types';

export default function base(item) {
  return {
    id: item.id,
    originalItem: item,
    type: getQbankType(item.genusTypeId),
    bankId: item.bankId,
    assessmentId: null, // TODO
    name: _.get(item, 'displayName.text'),
    language: getLanguage(_.get(item, 'question.text.languageTypeId')),
    question: {
      id: _.get(item, 'question.id'),
      type: getQbankType(_.get(item, 'question.genusTypeId')),
      text: _.get(item, 'question.text.text'),
      fileIds: _.get(item, 'question.fileIds'),
      choices: null, // implement in type
      texts: _.get(item, 'question.texts'),
      correctFeedback: {
        text: null,
        answerId: null,
      },
      incorrectFeedback: {
        text: null,
        answerId: null,
      },
    },
  };
}
