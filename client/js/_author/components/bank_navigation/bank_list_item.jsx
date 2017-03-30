import React            from 'react';
import _                from 'lodash';
import appHistory       from '../../history';
import Icon             from './bank_icon';

import PublishButton    from './buttons/publish_button';
import EmbedButton      from './buttons/embed_button';

export function ListItem(props) {
  const { selectItem, bank } = props;
  return (
    <tr
      onClick={() => selectItem()}
      tabIndex="0"
      role="button"
      aria-label={bank.displayName ? bank.displayName.text : 'bank item'}
    >
    {
      props.children
     }
    </tr>
  );
}

export function BankFolder(props) {
  const { bank } = props;
  const displayName = _.get(bank, 'displayName.text');
  return (
    <ListItem {...props} selectItem={() => props.getBankChildren(bank.id)}>
      <td><i className="material-icons">folder</i></td>
      <td>{displayName}</td>
      <td />
      <td />
    </ListItem>
  );
}

export function EditButton(props) {
  const isPublished = props.assessment.isPublished;
  return (
    <button
      className={`au-c-btn au-c-btn--square au-c-btn--table ${isPublished ? 'is-inactive' : ''}`}
    >
      <i className="material-icons">edit</i>
    </button>
  );
}

export function PreviewButton(props) {
  const isPublished = props.assessment.isPublished;
  return (
    <button
      className={`au-c-btn au-c-btn--square au-c-btn--table ${isPublished ? '' : 'is-inactive'}`}
      onClick={(e) => {
        e.stopPropagation();
        appHistory.push(`banks/${props.assessment.bankId}/assessments/${props.assessment.id}/preview`);
      }}
    >
      <i className="material-icons">remove_red_eye</i>
    </button>
  );
}

export function DeleteButton(props) {
  const { deleteAssessment, assessment } = props;
  const isPublished = assessment.isPublished;
  return (
    <button
      className={`au-c-btn au-c-btn--square au-c-btn--table ${isPublished ? 'is-inactive' : ''}`}
      onClick={e => deleteAssessment(e, assessment.bankId, assessment.id)}
    >
      <i className="material-icons">delete</i>
    </button>
  );
}

export function BankAssessment(props) {
  const {assessment, togglePublishAssessment} = props;
  const displayName = _.get(assessment, 'displayName.text');

  const selectItem = () => {
    if (assessment.isPublished) {
      appHistory.push(`banks/${assessment.bankId}/assessments/${assessment.id}/preview`);
      return;
    }
    appHistory.push(`banks/${assessment.bankId}/assessments/${assessment.id}`);
  };

  return (
    <ListItem {...props} bank={props.assessment} selectItem={selectItem}>
      <td>
        <i className="material-icons">description</i>
      </td>
      <td>{displayName}</td>
      <td>
        <PublishButton
          assessment={assessment}
          togglePublishAssessment={togglePublishAssessment}
        />
      </td>
      <td>
        <div className="au-c-table__icons">
          <EmbedButton {...props} />
          <EditButton {...props} />
          <PreviewButton {...props} />
          <DeleteButton {...props} />
        </div>
      </td>
    </ListItem>
  );
}
// TODO: think about breaking this into smaller components
export default function bankListItem(props) {
  const { bank, baseEmbedUrl } = props;

  const isPublished = bank.isPublished;
  const isAssessment = bank.type === 'Assessment';
  const assessOffered = bank.assessmentOffered ? bank.assessmentOffered[0] : undefined;
  const buttonContainer = {
    display: isAssessment ? '' : 'none',
  };

  function getPreviewUrl(bankId, assessmentId) {
    return (`banks/${bankId}/assessments/${assessmentId}/preview`);
  }

  const selectItem = () => {
    if (isAssessment && isPublished) {
      appHistory.push(getPreviewUrl(bank.bankId, bank.id));
    } else if (isAssessment) {
      appHistory.push(`banks/${bank.bankId}/assessments/${bank.id}`);
    } else {
      props.getBankChildren(bank.id);
    }
  };

  function deleteAssessment(e, bankId, assessmentId) {
    e.stopPropagation();
    // make a confirmation dialog.
    if (confirm('Delete this assessment?')) {
      props.deleteAssessment(bankId, assessmentId);
    }
  }

  function getEmbedCode(e, currentBank) {
    e.stopPropagation();
    props.getEmbedCode(currentBank.id, currentBank.bankId);
  }


  function embedButtonOrUrl() {
    if (isPublished) {
      if (assessOffered) {
        const embedUrlCode = `${baseEmbedUrl}&bank=${assessOffered.bankId}&assessment_offered_id=${assessOffered.id}#/assessment`;

        return (
          <div className="au-c-embed-contain">
            <label className="au-c-input--purple" htmlFor="embedInput">
              <input
                id="embedInput"
                onClick={e => e.stopPropagation()}
                className="au-c-text-input au-c-text-input--smaller"
                readOnly
                type="text"
                value={`<iframe src="${embedUrlCode}"/>`}
              />
            </label>
            <CopyToClipboard text={`<iframe src="${embedUrlCode}"/>`}>
              <button className="au-c-btn au-c-btn--square au-c-btn--embed " onClick={e => e.stopPropagation()}>
                <i className="material-icons">content_paste</i>
              </button>
            </CopyToClipboard>
          </div>
        );
      }

      return (
        <button
          className="au-c-btn au-c-btn--sm au-c-btn--table"
          onClick={e => getEmbedCode(e, bank)}
        >
          embed code
        </button>
      );
    }
    return null;
  }

  function getPreviewButton(bankId, assessmentId) {
    if (!isPublished || _.isUndefined(bankId) || _.isUndefined(assessmentId)) {
      return null;
    }

    return (
      <button
        className="au-c-btn au-c-btn--square au-c-btn--table"
        onClick={(e) => {
          e.stopPropagation();
          appHistory.push(getPreviewButton(bankId, assessmentId));
        }}
      >
        <i className="material-icons">remove_red_eye</i>
      </button>
    );
  }

  return (
    <tr
      onClick={() => selectItem()}
      tabIndex="0"
      role="button"
      aria-label={bank.displayName ? bank.displayName.text : 'bank item'}
    >
      <td><Icon type={bank.type} /></td>
      <td>{bank.displayName ? bank.displayName.text : null}</td>
      <td>
        <button
          className={`au-c-btn au-c-btn--square au-c-publish ${isPublished ? 'is-published' : ''}`}
          style={buttonContainer}
          onClick={(e) => {
            e.stopPropagation();
            props.togglePublishAssessment(bank);
          }}
        >
          <Icon type={isPublished ? 'Published' : 'Publish'} />
        </button>
      </td>
      <td>
        <div className="au-c-table__icons" style={buttonContainer}>
          {embedButtonOrUrl()}
          <button
            className={`au-c-btn au-c-btn--square au-c-btn--table ${isPublished ? 'is-inactive' : ''}`}
          >
            <i className="material-icons">edit</i>
          </button>
          {getPreviewButton(bank.bankId, bank.id)}
          <button
            className={`au-c-btn au-c-btn--square au-c-btn--table ${isPublished ? 'is-inactive' : ''}`}
            onClick={e => deleteAssessment(e, bank.bankId, bank.id)}
          >
            <i className="material-icons">delete</i>
          </button>
        </div>
      </td>
    </tr>
  );
}

bankListItem.propTypes = {
  bank: React.PropTypes.shape({
    displayName : React.PropTypes.shape({}),
  }).isRequired,
  baseEmbedUrl: React.PropTypes.string.isRequired,
  getEmbedCode: React.PropTypes.func.isRequired,
};
