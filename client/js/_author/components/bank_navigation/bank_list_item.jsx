import React      from 'react';
import _          from 'lodash';
import appHistory from '../../history';
import Icon       from './bank_icon';

// TODO: think about breaking this into smaller components
export default function bankListItem(props) {
  const { bank, publishedBankId } = props;

  const isPublished = _.includes(bank.assignedBankIds, publishedBankId);
  const isAssessment = bank.type === 'Assessment';
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
    props.deleteAssessment(bankId, assessmentId);
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
        <button className="c-btn c-btn--square c-publish" style={buttonContainer}>
          <Icon type={isPublished ? 'Published' : 'Publish'} />
        </button>
      </td>
      <td>
        <div className="c-table__icons" style={buttonContainer}>
          <button
            className="c-btn c-btn--sm c-btn--table"
            onClick={() => props.embedCode(bank.id, bank.bankId)}
          >
            embed code
          </button>
          <button className="c-btn c-btn--square c-btn--table">
            <i className="material-icons">edit</i>
          </button>
          <button className="c-btn c-btn--square c-btn--table">
            <i className="material-icons">remove_red_eye</i>
          </button>
          <button
            className="c-btn c-btn--square c-btn--table"
            onClick={e => deleteAssessment(e, bank.bankId, bank.id)}
          >
            <i className="material-icons">delete</i>
          </button>
        </div>
      </td>
      <div></div>
    </tr>
  );
}

bankListItem.propTypes = {
  bank: React.PropTypes.shape({
    displayName : React.PropTypes.shape({}),
  }).isRequired,
  publishedBankId: React.PropTypes.string.isRequired,
};
