import $   from "jquery";
import _   from "lodash";

export function transformItem(itemXml) {
  const xml         = $(itemXml);
  const material    = $("<div></div>");

  function getQuestionType(xml){
    if(xml.find("choiceInteraction[maxChoices=1]").length > 0){
      return "multiple_choice_question";
    } else if(xml.find("uploadInteraction").length > 0) {
      return "audio_upload";
    }
  }

  // If we don't .clone(), then .appendTo() *moves* the elements out of the
  // original, and on subsequent calls they will be missing.
  xml.find("itemBody > *:not(choiceInteraction)").clone().appendTo(material);

  const answers = xml.find("choiceInteraction > simpleChoice").map((i, t) => ({
    id: t.getAttribute("identifier"),
    material: $(t).html(),
    xml: t
  })).get();

  return {
    question_type: getQuestionType(xml),
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
