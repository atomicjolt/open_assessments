import _                    from 'lodash';
import { getQbankType }     from '../../../../constants/genus_types';
import { getLanguage }      from '../../../../constants/language_types';

export default function base(item) {
  return {
    id: item.id,
    type: getQbankType(item.genusTypeId),
    bankId: item.bankId,
    assessmentId: null, // TODO
    name: _.get(item, 'displayName.text'),
    language: getLanguage(_.get(item, 'displayName.languageTypeId')), // TODO: How does the language even work?
    question: {
      id: _.get(item, 'question.id'),
      type: getQbankType(_.get(item, 'question.genusTypeId')),
      text: _.get(item, 'question.text.text'),
      fileIds: {},
      choices: null, // implement in type
    },
  };
}
