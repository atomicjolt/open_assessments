import multipleChoice   from './multiple_choice';
import survey           from './survey';

export default function factory(type) {
  switch (type) {
    case 'multipleChoice':
      return multipleChoice;
    case 'survey':
    case 'multiSurvey':
      return survey;

    default:
      throw `invalid type: ${type}`;
  }
}
