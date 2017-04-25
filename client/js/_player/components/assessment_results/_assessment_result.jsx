import React                      from 'react';
import { connect }                from 'react-redux';
import * as AssessmentActions     from '../../actions/assessment';
import * as CommunicationActions  from '../../actions/communications';
import { questions, outcomes }    from '../../selectors/assessment';

const select = (state) => {
  return {
    assessmentResult : state.assessmentResult.toJS(),
    timeSpent        : state.timeSpent,
    questions        : questions(state),
    outcomes         : outcomes(state),
    assessment       : state.assessment,
    settings         : state.settings
  };
};

export class AssessmentResult extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.sendLtiOutcome();
    this.sendAnalytics();
  }

  componentDidMount() {
    this.props.sendSize();
    this.props.showLMSNavigation();
  }

  componentDidUpdate() {
    this.props.sendSize();
  }

  sendAnalytics() {
    if (this.props.assessmentResult && this.props.assessmentResult.assessment_results_id) {
      this.props.assessmentPostAnalytics(this.props.assessmentResult.assessment_results_id, this.props.settings.externalUserId, this.props.settings.external_context_id);
    }
  }
  sendLtiOutcome() {
    if (this.isSummative() && this.props.assessmentResult.assessment_results_id){
      this.props.assessmentPostLtiOutcome(this.props.assessmentResult.assessment_results_id);
    }
  }

  isSummative() {
    return this.props.settings.assessment_kind == "SUMMATIVE";
  }

  isFormative() {
    return this.props.settings.assessment_kind == "FORMATIVE";
  }

  render() {
    if (this.props.assessmentResult == null) {
      return <div />;
    }
    if (this.isFormative()) {
      return <FormativeResult
        assessmentResult={this.props.assessmentResult}
        settings={this.props.settings}
        questions={this.props.questions}
        assessment={this.props.assessment}
        context={this.context}
      />;
    } else {
      // return <SummativeResult
      //   settings={this.props.settings}
      //   assessmentResult={this.props.assessmentResult}
      //   assessment={this.props.assessment}
      //   questionResponses={this.props.questionResponses}
      //   questions={this.props.questions}
      //   timeSpent={this.props.timeSpent}
      //   isSummative={this.isSummative()}
      //   outcomes={this.props.outcomes}
      //   showPostMessageNavigation={this.props.settings.showPostMessageNavigation}
      //   navigateHome={() => { this.props.navigateHome() }}
      // />;
      return null;
    }
  }
}

export default connect(select, { ...AssessmentActions, ...CommunicationActions })(AssessmentResult);
