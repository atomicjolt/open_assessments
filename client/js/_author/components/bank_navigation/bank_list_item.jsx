import React      from 'react';
import _          from 'lodash';
import appHistory from '../../history';
import Icon       from './bank_icon';

// TODO: think about breaking this into smaller components
export default function bankListItem(props) {
  const { bank, publishedBankId, baseEmbedUrl } = props;

  const isPublished = _.includes(bank.assignedBankIds, publishedBankId);
  const published = isPublished ? 'is-published' : '';
  const isAssessment = bank.type === 'Assessment';
  const assessOffered = bank.assessmentOffered ? bank.assessmentOffered[0] : undefined;
  const buttonContainer = {
    display: isAssessment ? '' : 'none',
  };

  const selectItem = () => {
    if (isAssessment) {
      appHistory.push(`banks/${bank.bankId}/assessments/${bank.id}`);
    } else {
      props.getBankChildren(bank);
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
        const embedUrlCode = `${baseEmbedUrl}${assessOffered.bankId}&assessment_offered_id=${assessOffered.id}#/assessment`;
        return (
          <label className="c-input--purple" htmlFor="embedInput">
            <input
              id="embedInput"
              onClick={e => e.stopPropagation()}
              className="c-text-input c-text-input--smaller"
              readOnly
              type="text"
              value={`<iframe src="${embedUrlCode}"/>`}
            />
          </label>
        );
      }

      return (
        <button
          className="c-btn c-btn--sm c-btn--table"
          onClick={e => getEmbedCode(e, bank)}
        >
          embed code
        </button>
      );
    }
    return null;
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
        <button className={`c-btn c-btn--square c-publish ${published}`} style={buttonContainer}>
          <Icon type={isPublished ? 'Published' : 'Publish'} />
        </button>
      </td>
      <td>
        <div className="c-table__icons" style={buttonContainer}>
          {embedButtonOrUrl()}
          <button className="c-btn c-btn--square c-btn--table">
            <i className="material-icons">edit</i>
          </button>
          <button className="c-btn c-btn--square c-btn--table">
            <i className="material-icons">remove_red_eye</i>
          </button>
          {!isPublished ? <button
            className="c-btn c-btn--square c-btn--table"
            onClick={e => deleteAssessment(e, bank.bankId, bank.id)}
          >
            <i className="material-icons">delete</i>
          </button> : null}
        </div>
      </td>
    </tr>
  );
}

bankListItem.propTypes = {
  bank: React.PropTypes.shape({
    displayName : React.PropTypes.shape({}),
  }).isRequired,
  publishedBankId: React.PropTypes.string.isRequired,
  baseEmbedUrl: React.PropTypes.string.isRequired,
  getEmbedCode: React.PropTypes.func.isRequired,
};
