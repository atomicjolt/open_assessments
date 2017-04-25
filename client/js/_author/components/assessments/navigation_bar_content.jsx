import React            from 'react';
import _                from 'lodash';
import Icon             from '../bank_navigation/bank_icon';
import BackButton       from '../common/back_button';
import localize         from '../../locales/localize';
import appHistory       from '../../history';

class NavigationBarContent extends React.Component {
  static propTypes = {
    togglePublishAssessment: React.PropTypes.func,
    isPublished: React.PropTypes.bool.isRequired,
    items: React.PropTypes.array.isRequired,
    assessment: React.PropTypes.object.isRequired,
    localizeStrings: React.PropTypes.func.isRequired,
    getBankChildren: React.PropTypes.func.isRequired,
  };

  publishButton() {
    const strings = this.props.localizeStrings('navigationBarContent');
    if (!_.isEmpty(this.props.items)) {
      return (
        <button
          className="au-c-btn au-c-btn--sm au-c-btn--green"
          onClick={() => {
            this.props.togglePublishAssessment('navigationBarContent');
            appHistory.push('/');
          }}
        >
          <Icon type={this.props.isPublished ? 'Published' : 'Publish'} />
          {this.props.isPublished ? strings.unpublish : strings.publish}
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
    const strings = this.props.localizeStrings('navigationBarContent');
    return (
      <div className="au-c-header-bottom">
        <div className="au-c-header-bottom__left">
          <BackButton handleClick={() => this.backButton(bankId)} />
        </div>

        <div className="au-c-header-bottom__right">
          { this.publishButton() }
          {
            this.props.isPublished ?
              <button
                className="au-c-btn au-c-btn--sm au-c-btn--maroon au-u-ml-md"
                onClick={() => appHistory.push(`banks/${bankId}/assessments/${id}/preview`)}
              >
                <i className="material-icons">remove_red_eye</i>

                {strings.preview}
              </button> : null
         }
        </div>
      </div>
    );
  }
}

export default localize(NavigationBarContent);
