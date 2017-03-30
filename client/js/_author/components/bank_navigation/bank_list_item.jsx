import React            from 'react';
import _                from 'lodash';
import CopyToClipboard  from 'react-copy-to-clipboard';
import appHistory       from '../../history';
import Icon             from './bank_icon';

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

export function PublishButton(props) {
  const { togglePublishAssessment, assessment } = props;
  const isPublished = assessment.isPublished;
  const icon = isPublished ?
    <i className="material-icons is-published">cloud_done</i> :
    <i className="material-icons">cloud_upload</i>;
  return (
    <button
      className={`au-c-btn au-c-btn--square au-c-publish ${isPublished ? 'is-published' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        togglePublishAssessment(assessment);
      }}
    >
      { icon }
    </button>
  );
}

export function BankAssessment() {
  const {bank, togglePublishAssessment} = props;
  const displayName = _.get(bank, 'displayName.text');
  const isPublished = bank.isPublished;
  return (
    <ListItem>
      <td>
        <i className="material-icons">description</i>
      </td>
      <td>{displayName}</td>
      <td>
        <PublishButton bank={bank} togglePublishAssessment={togglePublishAssessment} />
      </td>
      <td>
        <div className="au-c-table__icons" style={buttonContainer}>
          { embedButtonOrUrl() }
          <button
            className={`au-c-btn au-c-btn--square au-c-btn--table ${isPublished ? 'is-inactive' : ''}`}
          >
            <i className="material-icons">edit</i>
          </button>
          { getPreviewButton(bank.bankId, bank.id) }
          <button
            className={`au-c-btn au-c-btn--square au-c-btn--table ${isPublished ? 'is-inactive' : ''}`}
            onClick={e => deleteAssessment(e, bank.bankId, bank.id)}
          >
            <i className="material-icons">delete</i>
          </button>
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
