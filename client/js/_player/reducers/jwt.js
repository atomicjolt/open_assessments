import { Constants as JwtConstants } from '../../actions/jwt';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {

    case JwtConstants.REFRESH_JWT_DONE:
      return action.payload.jwt;

    default:
      return state;

  }
};
