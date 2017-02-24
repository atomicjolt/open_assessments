import React                  from 'react';
import { connect }            from 'react-redux';
import AssessmentForm         from './assessment_form';
import Heading                from  '../common/heading';
import * as BankActions       from '../../../actions/qbank/banks';
import * as AssessmentActions from '../../../actions/qbank/assessments';
import * as ItemActions       from '../../../actions/qbank/items';

function select(state) {
  return {
    editableBankId: state.settings.editableBankId,
  };
}
export class NewAssessment extends React.Component {
  static propTypes = {
    params: React.PropTypes.shape({ id: React.PropTypes.string }).isRequired,
    editableBankId: React.PropTypes.string.isRequired,
    createAssessment: React.PropTypes.func.isRequired,
    publishAssessment: React.PropTypes.func.isRequired,
    createAssessmentWithItem: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      assessment: {
        assignedBankIds: [this.props.editableBankId]
      },
    };
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

  render() {
    return (
      <div>
        <Heading
          view="assessments"
          publishAssessment={this.props.publishAssessment}
        />
        <AssessmentForm
          updateAssessment={assessment => this.createAssessment(assessment)}
          createItem={newItem => this.createItem(newItem)}
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
