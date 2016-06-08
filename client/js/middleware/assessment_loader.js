import Request                              from "superagent";
import { DONE }                             from "../constants/wrapper";
import { Constants as AssessmentConstants } from "../actions/assessment";
import parseAssessment                      from "../parsers/parse_assessment";

const AssessmentLoad = store => next => action => {

  const loadAssessment = (qtiXml) => {
    const assessment = parseAssessment(qtiXml);
    store.dispatch({
      type:     action.type + DONE,
      payload:  assessment,
    });
  };

  if(action.type == AssessmentConstants.LOAD_ASSESSMENT){

    const el = document.getElementById('srcData');
    const data = el ? el.innerText : null;

    if(data){
      loadAssessment(data);
    } else {
      const state = store.getState();
      // Make an api call to load the assessment
      Request.get(state.settings.get("src_url")).then((response, error) => {
        loadAssessment(response.text);
      });
    }
  }

  // call the next middleWare
  next(action);

};

export { AssessmentLoad as default };
