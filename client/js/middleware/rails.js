import Network                                from "../constants/network";
import { Constants as AdminUserConstants }    from "../actions/admin/users";
import { Constants as AdminAccountConstants } from "../actions/admin/users";

export default {
  [JwtConstants.REFRESH_JWT]:            { method: Network.GET, url: (action) => { `api/sessions/${action.userId}`; } },
  [AssessmentConstants.LOAD_ASSESSMENT]: { method: Network.GET, url: (action) => { action.settings.srcUrl; } }
};