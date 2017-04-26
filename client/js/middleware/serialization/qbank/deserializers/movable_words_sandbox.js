import _ from 'lodash';
import $ from 'jquery';

import baseDeserializer                 from './base';
import { audioLimit }                   from '../../../../constants/question_types';
import { createSingleCorrectFeedback }  from '../../serializer_utils';
import { languages }                    from '../../../../constants/language_types';

function parseChoiceText(text) {
  const nodes = $.parseHTML(text);
  return {
    text: $(nodes).text(),
    wordType: $(nodes).attr('class'),
  };
}

export function deserializeMultiLanguageChoice(choice) {
  const texts = {};
  _.each(
    choice.texts,
    (text) => {
      texts[text.languageTypeId] = parseChoiceText(text.text);
    }
  );

  const englishTypeId = languages.languageTypeId.english;
  return {
    id: choice.id,
    text: _.get(texts, `[${englishTypeId}].text`, ''),
    wordType: _.get(texts, `[${englishTypeId}].wordType`, ''),
    texts
  };
}

export function deserializeMultiLanguageChoices(choices) {
  const all = {};
  _.each(
    choices,
    (choice) => { all[choice.id] = deserializeMultiLanguageChoice(choice); }
  );
  return all;
}

function deserializeChoice(choice) {
  return { ...parseChoiceText(choice.text), id: choice.id };
}

export function deserializeChoices(choices) {
  return choices.reduce((all, choice) => {
    all[choice.id] = deserializeChoice(choice);
    return all;
  }, {});
}

export default function movableWordSandbox(item) {
  const newItem = baseDeserializer(item);
  const timeValue = _.get(item, 'question.timeValue', {
    hours: '00',
    minutes: '00',
    seconds: _.toString(audioLimit)
  });

  const choices = deserializeMultiLanguageChoices(_.get(item, 'question.multiLanguageChoices', {}));

  newItem.question = {
    ...newItem.question,
    timeValue,
    choices,
    correctFeedback: createSingleCorrectFeedback(item),
  };

  return newItem;
}
