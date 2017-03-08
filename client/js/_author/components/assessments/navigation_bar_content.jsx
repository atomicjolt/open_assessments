import React            from 'react';
import _                from 'lodash';
import { hashHistory }  from 'react-router';
import Icon             from '../bank_navigation/bank_icon';
import appHistory       from '../../history';

export default class NavigationBarContent extends React.Component {
  static propTypes = {
    editOrPublishAssessment: React.PropTypes.func.isRequired,
    isPublished: React.PropTypes.bool.isRequired,
    items: React.PropTypes.array.isRequired,
    assessment: React.PropTypes.object.isRequired,
  };

  publishButton() {
    if (!_.isEmpty(this.props.items)) {
      return (
        <button
          className="author--c-btn author--c-btn--sm author--c-btn--green"
          onClick={() => this.props.editOrPublishAssessment(this.props.isPublished)}
        >
          <Icon type={this.props.isPublished ? 'Published' : 'Publish'} />
          {this.props.isPublished ? 'Unpublish' : 'Publish'}
        </button>
      );
    }
    return null;
  }

  backButton(bankId) {
    this.props.getBankChildren(bankId);
  }

  render() {
    const { bankId, assessmentId } = this.props.assessment;
    return (
      <div className="author--c-header-bottom">
        <div className="author--c-header-bottom__left">
          <button
            onClick={() => this.backButton(bankId)}
            className="author--c-btn author--c-btn--sm author--c-btn--outline author--c-btn--back"
          >
            <i className="material-icons">keyboard_arrow_left</i>
            Back
          </button>
        </div>

        <div className="author--c-header-bottom__right">
          { this.publishButton() }
          {
            this.props.isPublished ?
              <button
                className="author--c-btn author--c-btn--sm author--c-btn--maroon author--u-ml-md"
                onClick={() => hashHistory.push(`banks/${bankId}/assessments/${assessmentId}/preview`)}
              >
                <i className="material-icons">remove_red_eye</i>
              Preview Assessment
            </button> : null
         }
        </div>
      </div>
    );
  }
}

NavigationBarContent.propTypes = {
  editOrPublishAssessment: React.PropTypes.func.isRequired,
  getBankChildren: React.PropTypes.func.isRequired,
  isPublished: React.PropTypes.bool.isRequired,
  items: React.PropTypes.arrayOf(React.PropTypes.shape({})).isRequired,
};
