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
          className="au-c-btn au-c-btn--sm au-c-btn--green"
          onClick={() => this.props.editOrPublishAssessment(this.props.isPublished)}
        >
          <Icon type={this.props.isPublished ? 'Published' : 'Publish'} />
          {this.props.isPublished ? 'Unpublish' : 'Publish'}
        </button>
      );
    }
    return null;
  }

  handlePreviewClick() {
    const bankId = this.props.assessment.bankId;
    const assessmentId = this.props.assessment.id;
    hashHistory.push(`banks/${bankId}/assessments/${assessmentId}/preview`);
  }

  render() {
    return (
      <div className="au-c-header-bottom">
        <div className="au-c-header-bottom__left">
          <button
            onClick={() => hashHistory.push('/')}
            className="au-c-btn au-c-btn--sm au-c-btn--outline au-c-btn--back"
          >
            <i className="material-icons">keyboard_arrow_left</i>
            Back
          </button>
        </div>

        <div className="au-c-header-bottom__right">
          { this.publishButton() }
          {
            this.props.isPublished ?
              <button
                className="au-c-btn au-c-btn--sm au-c-btn--maroon au-u-ml-md"
                onClick={() => this.handlePreviewClick()}
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
  isPublished: React.PropTypes.bool.isRequired,
  items: React.PropTypes.arrayOf(React.PropTypes.shape({})).isRequired,
};
