import $   from "jquery";
import _   from "lodash";

export function transformItem(itemXml) {
  const xml         = $(itemXml);
  const select_one  = xml.find("choiceInteraction[maxChoices=1]");
  const material    = $("<div></div>");

  // If we don't .clone(), then .appendTo() *moves* the elements out of the
  // original, and on subsequent calls they will be missing.
  xml.find("itemBody > *:not(choiceInteraction)").clone().appendTo(material);

  const answers = xml.find("choiceInteraction > simpleChoice").map((i, t) => ({
    id: t.getAttribute("identifier"),
    material: $(t).html(),
    xml: t
  })).get();

  return {
    question_type: select_one ? "multiple_choice_question" : "UNKNOWN",
    material: material.html(),
    isHtml: true,
    answers
  };
}

export function getItems(sections, perSec) {
}

export function loadOutcomes(assessment) {
}

export function checkAnswer(item, selectedAnswers) {
}

function checkMultipleChoiceAnswer(item, selectedAnswerId) {
}

function checkMultipleAnswerAnswer(item, selectedAnswerId) {
}

function checkMatchingAnswer(item, selectedAnswerId) {
}
