import $   from "jquery";
import _   from "lodash";

export function transformItem(itemXml) {
  const xml         = $(itemXml);
  const allNodes    = xml.find("*");
  const material    = $("<div></div>");

  const interaction = _.find(allNodes, (node) => {
    return node.nodeName.match(/Interaction$/)
  });

  let answers = []

  if(interaction) {
    const interactionName = interaction.nodeName

    // If we don't .clone(), then .appendTo() *moves* the elements out of the
    // original, and on subsequent calls they will be missing.

    let questionMaterial = getQuestionMaterial(xml, interactionName)
    questionMaterial.appendTo(material);

    const answerNodes = _.filter($(interaction).find("*"), (node) => {
      return node.nodeName.match(/Choice$/)
    });

    answers = answerNodes.map((node) => ({
      id: node.getAttribute("identifier"),
      material: $(node).html(),
      xml: node
    }));
  }

  return {
    question_meta: getQuestionMeta(interaction, xml),
    question_type: getQuestionType(interaction),
    material: material.html(),
    isHtml: true,
    answers
  };
}

export function getQuestionMeta(interaction, xml){
  var attributes = {};
  _.range(0, interaction.attributes.length).forEach((i) => {
    var attr = interaction.attributes.item(i);
    attributes[attr.name] = attr.value;
  });

  switch(interaction.nodeName) {
    case "inlineChoiceInteraction":
      // We wrap the sentence in a div, because calling html on it directly
      // doesn't output valid html. <div></div> becomes <div />

      let sentence = xml.find(interaction.nodeName).parent().clone();
      sentence.find(interaction.nodeName).replaceWith('<div class="interaction-placeholder"></div>');
      const sentenceHtml = $('<div></div>').html(sentence).html()
      attributes["fillTheBlankQuestion"] = sentenceHtml;
  }

  return attributes;
}

export function getQuestionType(interaction = {}) {
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
    case "inlineChoiceInteraction":
      return "fill_the_blank_question"
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

export function getQuestionMaterial(xml, interactionName) {

  switch(interactionName) {
    case "inlineChoiceInteraction":
      let item = xml.find("itemBody").clone();
      item.find(interactionName).parent().remove();
      return item.children();
  }

  return xml.find(`itemBody > *:not(${interactionName})`).clone()
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
