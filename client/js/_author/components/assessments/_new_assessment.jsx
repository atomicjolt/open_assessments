import React                  from 'react';
import { connect }            from 'react-redux';
import AssessmentForm         from './assessment_form';
import Heading                from  '../common/heading';
import * as BankActions       from '../../../actions/qbank/banks';
import * as AssessmentActions from '../../../actions/qbank/assessments';
import * as ItemActions       from '../../../actions/qbank/items';

function select() {
  return {

  };
}
export class NewAssessment extends React.Component {
  static propTypes = {
    params: React.PropTypes.shape({ id: React.PropTypes.string }).isRequired,
    createAssessment: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      assessment: {},
    };
  }

  createAssessment(assessment) {
    // This redirects to the edit view in the middleware after the api call
    // comes back with an id.
    this.props.createAssessment(
      this.props.params.id,
      assessment,
    );
  }

  render() {
    return (
      <div>
        <Heading view="assessments" />
        <AssessmentForm
          updateAssessment={assessment => this.createAssessment(assessment)}
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
