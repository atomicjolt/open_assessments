import React                    from 'react';
import Icon                     from './bank_icon';

// TODO: think about breaking this into smaller components
export default class BankListItem extends React.Component {
  static propTypes = {
    bank: React.PropTypes.shape({
      displayName : React.PropTypes.shape({}),
      type        : React.PropTypes.string.isRequired,
    }).isRequired,
    getBankChildren: React.PropTypes.func.isRequired,
  };

  getStyles() {
    const isAssessment = this.props.bank.type === 'Assessment';

    return {
      buttonContainer: {
        display: isAssessment ? '' : 'none',
      }
    };
  }

  selectItem() {
    const { bank } = this.props;
    if (bank.type === 'Assessment') {
      // console.log(`take me to assessment ${bank.id}`);
    } else {
      this.props.getBankChildren(bank);
    }
  }

  render() {
    const styles = this.getStyles();
    const { bank } = this.props;

    return (
      <tr
        onClick={() => this.selectItem()}
        tabIndex="0"
        role="button"
        aria-label={bank.displayName ? bank.displayName.text : 'bank item'}
      >
        <td><Icon type={bank.type} /></td>
        <td>{bank.displayName ? bank.displayName.text : null}</td>
        <td>
          <button className="c-btn c-btn--square c-publish" style={styles.buttonContainer}>
            <Icon type={bank.published ? 'Published' : 'Publish'} />
          </button>
        </td>
        <td>
          <div className="c-table__icons" style={styles.buttonContainer}>
            <button className="c-btn c-btn--sm c-btn--table">
              embed code
            </button>
            <button className="c-btn c-btn--square c-btn--table">
              <i className="material-icons">edit</i>
            </button>
            <button className="c-btn c-btn--square c-btn--table">
              <i className="material-icons">remove_red_eye</i>
            </button>
            <button className="c-btn c-btn--square c-btn--table">
              <i className="material-icons">delete</i>
            </button>
          </div>
        </td>
      </tr>
    );
  }
}
