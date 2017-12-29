import React     from 'react';
import DotLoader from '../../../../common/dot_loader';
import types     from '../../../../../../constants/question_types';
import HelpLink  from '../../../help_link';

export default function DefaultHeader(props) {
  if (props.isRemoving) { return <DotLoader />; }

  let helpLinkPath = '/help.html';
  switch (props.type) {
    case types.audioUpload:
      helpLinkPath += '#user-content-audio-record';
      break;

    case types.fileUpload:
      helpLinkPath += '#user-content-file-upload';
      break;

    case types.movableWordSandbox:
      helpLinkPath += '#user-content-movable-word----sandbox';
      break;

    case types.movableWordSentence:
      helpLinkPath += '#user-content-movable-word----sentence';
      break;

    case types.movableFillBlank:
      helpLinkPath += '#user-content-movable-word----fill-in-the-blank';
      break;

    case types.shortAnswer:
      helpLinkPath += '#user-content-short-answer';
      break;

    case types.imageSequence:
      helpLinkPath += '#user-content-image-sequence';
      break;

    case types.multipleChoice:
      helpLinkPath += '#user-content-multiple-choice';
      break;

    case types.reflection:
      helpLinkPath += '#user-content-multiple-choice----reflection';
      break;

    case types.multipleAnswer:
      helpLinkPath += '#user-content-multiple-choice----multiple-select';
      break;

    case types.multipleReflection:
      helpLinkPath += '#user-content-multiple-choice----multiple-select--reflection';
      break;

    case types.dragAndDrop:
      helpLinkPath += '#user-content-drag-and-drop';
      break;

    default:
      break;
  }

  return (
    <div className="au-o-right au-c-question-icons">
      <button
        className="au-c-btn au-c-btn--square"
        tabIndex="0"
        onClick={props.togglePreview}
      >
        <i className="material-icons">remove_red_eye</i>
      </button>
      <button
        className="au-c-btn au-c-btn--square"
        tabIndex="0"
        onClick={props.toggleReorder}
      >
        <i className="material-icons">swap_vert</i>
      </button>
      <button
        className="au-c-btn au-c-btn--square"
        tabIndex="0"
        onClick={() => props.deleteAssessmentItem(props.id)}
      >
        <i className="material-icons">delete</i>
      </button>
      <HelpLink
        to={helpLinkPath}
        icon
      />
    </div>
  );
}

DefaultHeader.propTypes = {
  id: React.PropTypes.string,
  deleteAssessmentItem: React.PropTypes.func,
  toggleReorder: React.PropTypes.func,
  isRemoving: React.PropTypes.bool,
  togglePreview: React.PropTypes.func,
  type: React.PropTypes.string,
};
