import _  from "lodash";

export default (state = {}, action) => {
  return state; // Just return state. Don't let settings from the server mutate.
};

export function getInitialSettings(){
  var settings = _.merge({}, ...arguments); // Add default settings that can be overriden by values in serverSettings

  // These player settings should be numbers. Change them once here and be done with it.
  var integerSettings = [ "user_id", "max_attempts", "questions_per_section", "questions_per_page"];
  _.each(integerSettings, (setting) => {
    if(settings[setting]){settings[setting] = parseInt(settings[setting]);}
  });

  return settings;
};
