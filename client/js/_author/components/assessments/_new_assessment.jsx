import React                  from 'react';
import { connect }            from 'react-redux';
import _                      from 'lodash';
import AssessmentForm         from './assessment_form';
import hashHistory            from '../../history';
import Heading                from  '../common/heading';
import * as BankActions       from '../../../actions/qbank/banks';
import * as AssessmentActions from '../../../actions/qbank/assessments';
import * as ItemActions       from '../../../actions/qbank/items';

function select(state) {
  return {
    editableBankId: state.settings.editableBankId,
    banks: state.banks,
  };
}
export class NewAssessment extends React.Component {
  static propTypes = {
    params: React.PropTypes.shape({ id: React.PropTypes.string }).isRequired,
    editableBankId: React.PropTypes.string.isRequired,
    createAssessment: React.PropTypes.func.isRequired,
    createAssessmentWithItem: React.PropTypes.func.isRequired,
    updatePath: React.PropTypes.func.isRequired,
    getAssessments: React.PropTypes.func.isRequired,
    banks: React.PropTypes.arrayOf(React.PropTypes.shape({}))
  };

  constructor(props) {
    super(props);
    this.state = {
      assessment: {
        assignedBankIds: [this.props.editableBankId]
      },
    };
  }

  getBankChildren(bankId) {
    const id = encodeURIComponent(bankId);
    const flatBanks = {};
    const banks = this.flattenBanks(this.props.banks, flatBanks);
    this.props.updatePath(id, banks[id], true);
    this.props.getAssessments(id);
    hashHistory.push('/');
  }

  createAssessment(assessment) {
    // This redirects to the _edit_assessment.jsx view in the middleware after the api call
    // comes back with an id.
    this.props.createAssessment(
      this.props.params.id,
      assessment,
    );
  }

  createItem(newItem) {
    this.props.createAssessmentWithItem(
      this.props.params.id,
      this.state.assessment,
      newItem,
    );
  }

  flattenBanks(banks, flatBanks) {
    _.forEach(banks, (bank) => {
      flatBanks[bank.id] = bank; // eslint-disable-line no-param-reassign
      if (!_.isEmpty(bank.childNodes)) {
        this.flattenBanks(bank.childNodes, flatBanks);
      }
    });
    return flatBanks;
  }


  render() {
    return (
      <div>
        <Heading
          view="assessments"
          isPublished={false}
          assessment={{ bankId: this.props.params.id, assessmentId: null }}
          items={[]}
          getBankChildren={bankId => this.getBankChildren(bankId)}
        />
        <AssessmentForm
          updateAssessment={assessment => this.createAssessment(assessment)}
          createItem={newItem => this.createItem(newItem)}
          createChoice={() => {}}
          bankId=""
        />
      </div>
    );
  }
}

export default connect(select, {
  ...BankActions,
  ...AssessmentActions,
  ...ItemActions
})(NewAssessment);
