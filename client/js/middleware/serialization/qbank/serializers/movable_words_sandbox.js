import _ from 'lodash';

import { baseItem }        from './base';
import {
  scrub,
  getSingleCorrectAnswer,
  languageText,
  extractAllLanguageChoices,
  addNewChoices
}                          from '../../serializer_utils';
import guid                from '../../../../utils/guid';

const makeChoiceText = (choice) => {
  if (choice.wordType) {
    return `<p class='${choice.wordType}'>${choice.text}</p>`;
  }
  return `<p>${choice.text}</p>`;
};

const makeNewChoice = language => ({
  id: guid(),
  texts: {
    [language]: { text: '' }
  }
});

const makeChoice = (choice) => {
  const { language } = choice;
  const text = choice.text || _.get(choice, `texts[${language}].text`, '');
  const wordType = choice.wordType || _.get(choice, `texts[${language}].wordType`, '');
  return scrub({
    delete: choice.delete,
    id: choice.id,
    text: languageText(makeChoiceText({ text, wordType }), language),
  });
};

export function updateLanguageChoice(choice, update) {
  const { id, text, wordType, language } = choice;
  const updatedLanguage = choice.language && choice.language === update.language;
  const updatedText = update.text || text;

  return {
    id,
    text: updatedLanguage ? updatedText : text,
    wordType: update.wordType || wordType,
    language,
    delete: update.delete
  };
}

export function updateLanguageChoices(allChoices, updatedChoices) {
  return _.reduce(updatedChoices, (changed, choice) => {
    const childChoices = _.filter(allChoices, c => c.id === choice.id);
    const updatedChildren = _.map(
      childChoices,
      languageChoice => updateLanguageChoice(languageChoice, choice)
    );
    return changed.concat(updatedChildren);
  }, []);
}

export function serializeChoices(choices, language) {
  const allChoices = extractAllLanguageChoices(addNewChoices(choices, language));
  const updates = _.map(choices, choice => ({ ...choice, language }));
  const updatedChoices = updateLanguageChoices(allChoices, updates);
  return _.map(updatedChoices, (choice => makeChoice(choice)));
}

export function serializeFileIds(correctFeedback, incorrectFeedback) {
  return {
    ..._.get(correctFeedback, 'fileIds', {}),
    ..._.get(incorrectFeedback, 'fileIds', {}),
  };
}

export default function movableWordsSerializer(originalItem, newItemAttributes) {
  const newItem = baseItem(originalItem, newItemAttributes);
  const { question, language } = newItemAttributes;

  // Serialize timeValue
  if (!_.isEmpty(_.get(newItemAttributes, 'question.timeValue', {}))) {
    newItem.question.timeValue = _.merge(
      {},
      newItemAttributes.question.timeValue
    );
  }


  const newChoiceAttributes = _.get(newItemAttributes, 'question.choices', {});
  if (!_.isEmpty(newChoiceAttributes)) {
    const originalChoices = _.get(originalItem, 'question.choices', {});
    const toUpdate = _.map(newChoiceAttributes, (choice) => {
      const originalChoice = _.get(originalChoices, `[${choice.id}]`, {});
      if (choice.id === 'new') { return makeNewChoice(language); }
      return _.merge(
        {},
        {
          texts: originalChoice.texts
        },
        choice
      );
    });

    _.set(newItem, 'question.choices', serializeChoices(toUpdate, language));
  }
  const correctFeedback = _.get(question, 'correctFeedback');

  if (correctFeedback) {
    newItem.answers = [
      getSingleCorrectAnswer(originalItem, question, language)
    ];
  }
  return newItem;
}
