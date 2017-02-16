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
    settings: state.settings,
    items: _.at(state.items[props.params.bankId], assessmentItemIds),
    currentAssessment: state.assessments[encodeURIComponent(props.params.bankId)][encodeURIComponent(props.params.id)]
  };
}

export class NewAssessment extends React.Component {
  static propTypes = {
    params: React.PropTypes.shape({
      id: React.PropTypes.string,
      bankId: React.PropTypes.string
    }).isRequired,
    assessment: React.PropTypes.shape({
      id: React.PropTypes.string,
      bankId: React.PropTypes.string
    }),
    currentAssessment: React.PropTypes.shape({
      assignedBankIds: React.PropTypes.array,
    }),
    settings: React.PropTypes.shape({
      editableBankId: React.PropTypes.string,
      publishedBankId: React.PropTypes.string
    }),
    editOrPublishAssessment: React.PropTypes.func.isRequired,
    deleteAssignedAssessment: React.PropTypes.func.isRequired,
    createAssessmentOffered: React.PropTypes.func.isRequired,
    getAssessments: React.PropTypes.func.isRequired,
    updateAssessment: React.PropTypes.func.isRequired,
    getAssessmentItems: React.PropTypes.func.isRequired,
    createItemInAssessment: React.PropTypes.func.isRequired,
    updateItem: React.PropTypes.func.isRequired,
    items: React.PropTypes.arrayOf(React.PropTypes.shape({}))
  };

  constructor(props) {
    super(props);
    this.titleField = null;
    this.state = {
      assessment: {
      },
    };
  }

  componentDidMount() {
    this.props.getAssessments(this.props.params.bankId);
    this.props.getAssessmentItems(
      this.props.params.bankId,
      this.props.params.id
    );
  }

  updateAssessment() {
    this.props.updateAssessment(
      this.props.params.bankId,
      {
        name: this.state.assessment.name,
        description: this.state.assessment.description,
        id: this.props.params.id,
      },
    );
  }

  updateStateAssessment(field, value) {
    const assessment = this.state.assessment;
    assessment[field] = value;
    this.setState({ assessment });
  }

  editItem(itemIndex, field, data) {
    const items = this.state.items;
    items[itemIndex][field] = data;
    this.setState({ items });
  }

  updateItem(item) {
    this.props.updateItem(this.props.params.bankId, item);
  }

  addItem() {
  //  TODO: write me
  }

  createItem(newItem) {
    this.props.createItemInAssessment(
      this.props.params.bankId,
      this.props.params.id,
      _.map(this.assessmentProps().items, 'id'),
      newItem,
    );
  }

  assessmentProps() {
    return { ...this.props.assessment, ...this.state.assessment };
  }

  editOrPublishAssessment(published) {
    const { assessment, settings } = this.props;
    if (published) {
      this.props.deleteAssignedAssessment(assessment, settings.publishedBankId);
      // delete all the old offeredAssessments
      // can you delete if its already empty?
      this.props.editOrPublishAssessment(assessment, settings.editableBankId);
    } else {
      if (_.includes(assessment.assignedBankIds, this.props.settings.editableBankId)) {
        this.props.deleteAssignedAssessment(assessment, settings.editableBankId);
      }
      if (_.isEmpty(assessment.assessmentOffered) && !_.isEmpty(this.props.items)) {
        const body = { id: '123' }; // have to send up a garbage value for the create to work.
        this.props.createAssessmentOffered(assessment.bankId, assessment.id, body);
      }
      this.props.editOrPublishAssessment(assessment, settings.publishedBankId);
    }
  }

  render() {

    const { currentAssessment, settings } = this.props;
    const isPublished =  _.includes(currentAssessment.assignedBankIds, settings.publishedBankId);
    return (
      <div>
        <Heading
          view="assessments"
          editOrPublishAssessment={(published) => { this.editOrPublishAssessment(published); }}
          isPublished={isPublished}
          items={this.props.items}
        />
        <AssessmentForm
          {...this.assessmentProps()}
          updateAssessment={() => this.updateAssessment()}
          updateStateAssessment={(field, value) => this.updateStateAssessment(field, value)}
          items={this.props.items}
          updateItem={item => this.updateItem(item)}
          createItem={newItem => this.createItem(newItem)}
          editItem={(index, field, data) => this.editItem(index, field, data)}
          addItem={() => this.addItem()}
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
