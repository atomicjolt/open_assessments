import api                                  from "../libs/api";
import { DONE }                             from "../constants/wrapper";
import { Constants as AssessmentConstants } from "../actions/assessment";
import parseAssessment                      from "../parsers/parse_assessment";

const AssessmentLoad = store => next => action => {

  const loadAssessment = (data) => {
    const assessment = parseAssessment(data);
    store.dispatch({
      type:     action.type + DONE,
      payload:  assessment,
    });
  };

  if(action.type == AssessmentConstants.LOAD_ASSESSMENT_DONE){

    const el = document.getElementById('srcData');
    const data = el ? el.innerText : null;

    if(data){
      loadAssessment(data);
    } else {
      // Make an api call to load the assessment
      const promise = api.get(url, state.settings.get("apiUrl"), state.settings.get("jwt"), state.settings.get("csrfToken"), params);
      if(promise){
        promise.then((response, error) => {
          loadAssessment(response.body);
        });
      }
    }
  }

  // call the next middleWare
  next(action);

};

export { AssessmentLoad as default };
