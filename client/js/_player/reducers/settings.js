import _ from 'lodash';

// These player settings should be numbers. Change them once here and be done with it.
export const integerSettings = [ "user_id", "max_attempts", "questions_per_section", "questions_per_page", "audio_recorder_timeout"];

export default (state = {}, action) => {
  return state; // Just return state. Don't let settings from the server mutate.
};

export function getInitialSettings(){
  var settings = _.merge({}, ...arguments); // Add default settings that can be overriden by values in serverSettings

  _.each(integerSettings, (setting) => {
    if(settings[setting]){settings[setting] = parseInt(settings[setting]);}
  });

  return settings;
};
