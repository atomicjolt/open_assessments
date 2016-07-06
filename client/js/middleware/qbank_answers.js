import { Constants as AssessmentProgressConstants } from "../actions/assessment_progress";
import callMap                                      from "./qbank";

const QbankAnswers = store => next => action => {

  switch(action.type) {

    case AssessmentProgressConstants.ASSESSMENT_NEXT_QUESTIONS:
      const state = store.getState();
      const currentItemIndex = state.progress.get("currentItemIndex");
      const questionIndexes = _.range(currentItemIndex, currentItemIndex + action.pageSize);

      const checkAction = {
        type: AssessmentProgressConstants.ASSESSMENT_CHECK_ANSWER,
        questionIds: questionIndexes
      }

      callMap[AssessmentProgressConstants.ASSESSMENT_NEXT_QUESTIONS](store, checkAction)
      break;
  }

  // call the next middleWare
  next(action);

};

export { QbankAnswer as default };
