import $                   from "jquery";
import { createSelector }  from "reselect";

// Input selectors. These selectors only retrieve data from state. They do not modify it.
// export const assessment          = (state, props) => state.assessment;
// export const sections            = (state, props) => state.sections;
// export const questionsPerSection = (state, props) => state.settings.get('questions_per_section');

// Memoized selectors. These selectors transform state. Since the transformation might be
// expensive the results are memoized. The transform function will only be called if the
// input selectors change.
// export const questions = createSelector(
//   [ sections, questionsPerSection ],
//   (sections, questionsPerSection) => getItems(sections, questionsPerSec)
// );

// export const outcomes = createSelector(
//   [ assessment ],
//   (assessment) => loadOutcomes(state.assessment)
// );

// export const questionCount = createSelector(
//   [ questions ],
//   (questions) => questions.length
// );

export function questions(state, props) {
  console.log("questions", state, props);
  const item        = state.assessment.item;
  const xml         = $(item);
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

  return [{
    question_type: select_one ? "multiple_choice_question" : "UNKNOWN",
    material: material.html(),
    answers,
    xml: item
  }];
}

export function outcomes() {
  return {};
}

export function questionCount(state, props) {
  return 1;
}
