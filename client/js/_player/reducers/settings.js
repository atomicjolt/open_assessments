import _ from 'lodash';

// These player settings should be numbers. Change them once here and be done with it.
export const integerSettings = [ "user_id", "max_attempts", "questions_per_section", "questions_per_page", "audio_recorder_timeout"];

// Allow these server-side settings to take priority over the URL params,
// so content can be more portable.
const serverSettingsTakePriority = ['api_url'];

export default (state = {}, action) => {
  return state; // Just return state. Don't let settings from the server mutate.
};

export function getInitialSettings(...args) {
  var settings = _.merge({}, ...args);
  // Add default settings that can be overriden by values in serverSettings

  _.each(integerSettings, (setting) => {
    if(settings[setting]){settings[setting] = parseInt(settings[setting]);}
  });

  // assumes that the serverSettings are always the first argument,
  //   which is expected given currently URL params overwrite
  //   serverSettings (due to how _.merge works)
  _.each(serverSettingsTakePriority, (setting) => {
    if (settings[setting] && args[0][setting] && args[0][setting] !== '')
    { settings[setting] = args[0][setting]; }
  });

  return settings;
};
