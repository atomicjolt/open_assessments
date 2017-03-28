import React            from 'react';
import _                from 'lodash';
import { Link }         from 'react-router';
import Icon             from '../bank_navigation/bank_icon';
import BackButton       from '../common/back_button';

export default class NavigationBarContent extends React.Component {
  static propTypes = {
    togglePublishAssessment: React.PropTypes.func,
    isPublished: React.PropTypes.bool.isRequired,
    items: React.PropTypes.array.isRequired,
    assessment: React.PropTypes.object.isRequired,
  };

  publishButton() {
    if (!_.isEmpty(this.props.items)) {
      return (
        <button
          className="au-c-btn au-c-btn--sm au-c-btn--green"
          onClick={() => this.props.togglePublishAssessment()}
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
    const { bankId, id } = this.props.assessment;
    return (
      <div className="au-c-header-bottom">
        <div className="au-c-header-bottom__left">
          <BackButton handleClick={() => this.backButton(bankId)} />
        </div>

        <div className="au-c-header-bottom__right">
          { this.publishButton() }
          {
            this.props.isPublished ?
              <Link
                className="au-c-btn au-c-btn--sm au-c-btn--maroon au-u-ml-md"
                to={`banks/${bankId}/assessments/${id}/preview`}
                target="_blank"
              >
                <i className="material-icons">remove_red_eye</i>
                Preview Assessment
              </Link> : null
         }
        </div>
      </div>
    );
  }
}
