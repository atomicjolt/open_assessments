import _    from 'lodash';
import genusTypes from '../../constants/genus_types';

export function scrub(item) {
  let scrubbedItem = _.cloneDeep(item);
  scrubbedItem = _.omitBy(scrubbedItem, _.isNil);
  scrubbedItem = _.omitBy(scrubbedItem, temp => _.isObject(temp) && _.isEmpty(temp));
  return scrubbedItem;
}

export function getSingleCorrectAnswer(originalItem, question) {
  const answer = {
    genusTypeId: genusTypes.answer.rightAnswer,
    feedback: question.correctFeedback.text,
    fileIds: question.correctFeedback.fileIds,
    id: _.get(originalItem, 'question.correctFeedback.answerId'),
  };

  return scrub(answer);
}

export function createSingleCorrectFeedback(item) {
  return {
    fileIds: _.get(item, 'answers[0].fileIds'),
    text: _.get(item, 'answers[0].feedback.text'),
    answerId: _.get(item, 'answers[0].id')
  };
}
