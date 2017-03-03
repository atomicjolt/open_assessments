import _                    from 'lodash';
import { getQbankType }     from '../../../../constants/genus_types';
import { getLanguage }      from '../../../../constants/language_types';

export default function base(item) {
  const languages = item.question ? item.question.texts : [];
  let languageTypeId = '';
  // TODO: always grabs last one, pass the langauge through and find it.
  if (!_.isEmpty(languages)) {
    languageTypeId = _.last(languages).languageTypeId;
  }
  return {
    id: item.id,
    type: getQbankType(item.genusTypeId),
    bankId: item.bankId,
    assessmentId: null, // TODO
    name: _.get(item, 'displayName.text'),
    language: getLanguage(languageTypeId), // TODO: How does the language even work?
    question: {
      id: _.get(item, 'question.id'),
      type: getQbankType(_.get(item, 'question.genusTypeId')),
      text: _.get(item, 'question.text.text'),
      fileIds: {},
      choices: null, // implement in type
    },
  };
}
