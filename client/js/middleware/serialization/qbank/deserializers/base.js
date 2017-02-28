import { getQbankType }     from '../../../../constants/genus_types';

export default function base(item) {
  return {
    id: item.id,
    type: getQbankType(item.genusTypeId),
    bankId: item.bankId,
    assessmentId: null, // TODO
    name: _.get(item, 'displayName.text'),
    question: {
      id: _.get(item, 'question.id'),
      type: getQbankType(_.get(item, 'question.genusTypeId')),
      text: _.get(item, 'question.text.text'),
      fileIds: {},
      choices: null, // implement in type
    },
  };
}
