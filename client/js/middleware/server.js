import Network                                      from '../constants/network';
import { Constants as JwtConstants }                from '../actions/jwt';

export default {
  [JwtConstants.REFRESH_JWT]: {
    method : Network.GET,
    url    : action => `api/sessions/${action.userId}`,
  },
};
