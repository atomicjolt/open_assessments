import * as Assessment from '../../actions/qbank/assessment';
import { DONE } from '../../constants/wrapper';
// Leave this empty. It will hold banks by id. IE `state[someId] = {a_bank}`
const initialState = [];

export default function preview(state = initialState, action) {
  switch (action.type) {

    case Assessment.Constants.GET_ASSESSMENT_PREVIEW + DONE: {
      debugger;
      return state;
    }

    default:
      return state;
  }
}
