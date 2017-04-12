import * as Assessment from '../../actions/qbank/assessments';
import { DONE } from '../../constants/wrapper';

const initialState = [];

export default function preview(state = initialState, action) {
  switch (action.type) {

    case Assessment.Constants.GET_ASSESSMENT_PREVIEW + DONE: {
      return action.payload;
    }

    default:
      return state;
  }
}
