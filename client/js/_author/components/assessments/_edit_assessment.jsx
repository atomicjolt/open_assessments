import React                  from 'react';
import { connect }            from 'react-redux';
import _                      from 'lodash';
import Heading                from  '../common/heading';
import AssessmentForm         from './assessment_form';
import * as BankActions       from '../../../actions/qbank/banks';
import * as AssessmentActions from '../../../actions/qbank/assessments';
import * as ItemActions       from '../../../actions/qbank/items';

function transformAssessment(assessment) {
  if (!assessment) return {};
  const fixedAssessment = {
    ...assessment,
    name: assessment.displayName.text,
  };

  return fixedAssessment;
}

function select(state, props) {
  const bank = state.assessments[encodeURIComponent(props.params.bankId)];
  const assessmentItemIds = state.assessmentItems[props.params.id];

  return {
    assessment: bank && transformAssessment(bank[encodeURIComponent(props.params.id)]),
    items: _.at(state.items[props.params.bankId], assessmentItemIds)
  };
}

export class NewAssessment extends React.Component {
  static propTypes = {
    params: React.PropTypes.shape({
      id: React.PropTypes.string,
      bankId: React.PropTypes.string
    }).isRequired,
    assessment: React.PropTypes.shape({
      items: React.PropTypes.arrayOf(React.PropTypes.shape),
    }),
    createItemInAssessment: React.PropTypes.func.isRequired,
    updateItem: React.PropTypes.func.isRequired,
    items: React.PropTypes.arrayOf(React.PropTypes.shape({})),
    updateChoice: React.PropTypes.func.isRequired,
    getAssessments: React.PropTypes.func.isRequired,
    getAssessmentItems: React.PropTypes.func.isRequired,
    updateAssessment: React.PropTypes.func.isRequired,
    updateAnswer: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getAssessments(this.props.params.bankId);
    this.props.getAssessmentItems(
      this.props.params.bankId,
      this.props.params.id
    );
  }

  updateAssessment(newFields) {
    const { assessment } = this.props;
    this.props.updateAssessment(
      this.props.params.bankId,
      {
        id: this.props.params.id,
        name: newFields.name || assessment.displayName.text,
        description: newFields.name || assessment.description.text,
      },
    );
  }

  updateItem(item) {
    this.props.updateItem(this.props.params.bankId, item);
  }

  createItem(newItem) {
    this.props.createItemInAssessment(
      this.props.params.bankId,
      this.props.params.id,
      _.map(this.props.assessment.items, 'id'),
      newItem,
    );
  }

  render() {
    const { bankId } = this.props.params;
    return (
      <div>
        <Heading view="assessments" />
        <AssessmentForm
          {...this.props.assessment}
          updateAssessment={newFields => this.updateAssessment(newFields)}
          items={this.props.items}
          updateItem={item => this.updateItem(item)}
          createItem={newItem => this.createItem(newItem)}
          updateChoice={(itemId, choice) => this.props.updateChoice(bankId, itemId, choice)}
          updateAnswer={(itemId, answer) => this.props.updateAnswer(bankId, itemId, answer)}
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
