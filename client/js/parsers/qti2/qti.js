import $   from "jquery";
import _   from "lodash";

export function transformItem(itemXml) {
  const xml         = $(itemXml);
  const allNodes    = xml.find("*");
  const material    = $("<div></div>");

  const interaction = _.find(allNodes, (node) => {
    return node.nodeName.match(/Interaction$/)
  });

  const interactionName = interaction.nodeName
  // If we don't .clone(), then .appendTo() *moves* the elements out of the
  // original, and on subsequent calls they will be missing.
  xml.find(`itemBody > *:not(${interactionName})`).clone().appendTo(material);

  const answers = $(interaction).find("simpleChoice").map((i, t) => ({
    id: t.getAttribute("identifier"),
    material: $(t).html(),
    xml: t
  })).get();

  return {
    question_meta: getQuestionMeta(interaction),
    question_type: getQuestionType(interaction),
    material: material.html(),
    isHtml: true,
    answers
  };
}

export function getQuestionMeta(interaction){
  var attributes = {};
  _.range(0, interaction.attributes.length).forEach((i) => {
    var attr = interaction.attributes.item(i);
    attributes[attr.name] = attr.value;
  });
  return attributes;
}

export function getQuestionType(interaction) {
  switch(interaction.nodeName) {
    case "choiceInteraction":
      if(interaction.attributes["maxChoices"].value === "1") {
        return "multiple_choice_question";
      } else {
        return "multiple_answers_question";
      }
      break;

    case "orderInteraction":
      return "sentence_sandbox";
      break;

    case "extendedTextInteraction":
      return "short_answer_question";
      break;

    case "textEntryInteraction":
      return "text_input_question";
      break;
    case "uploadInteraction":
      return "audio_upload_question"
      break;

    default:
      return "UNKNOWN";
  }
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
