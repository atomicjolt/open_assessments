import React            from 'react';
import _                from 'lodash';
import { hashHistory }  from 'react-router';
import Icon             from '../bank_navigation/bank_icon';
import Preview          from './assessment_preview';

export default class NavigationBarContent extends React.Component {
  static propTypes = {
    editOrPublishAssessment: React.PropTypes.func.isRequired,
    isPublished: React.PropTypes.bool.isRequired,
    items: React.PropTypes.array.isRequired,
    assessment: React.PropTypes.object,
  };

  constructor() {
    super();
    this.state = {
      shouldDisplayPreview: false,
    };
  }

  getPreview(stuff) {
    if (stuff) return <Preview assessment={this.props.assessment} />;
    return null;
  }

  publishButton() {
    if (!_.isEmpty(this.props.items)) {
      return (
        <button
          className="c-btn c-btn--sm c-btn--green"
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
    this.setState({
      shouldDisplayPreview: !this.state.shouldDisplayPreview
    });
  }


  render() {
    return (
      <div className="c-header-bottom">
        <div className="c-header-bottom__left">
          <button
            onClick={() => hashHistory.goBack()}
            className="c-btn c-btn--sm c-btn--outline c-btn--back"
          >
            <i className="material-icons">keyboard_arrow_left</i>
            Back
          </button>
        </div>

        <div className="c-header-bottom__right">
          { this.publishButton() }
          <button
            className="c-btn c-btn--sm c-btn--maroon u-ml-md"
            onClick={() => this.handlePreviewClick()}
          >
            <i className="material-icons">remove_red_eye</i>
            Preview Assessment
          </button>
        </div>
        {this.getPreview(this.state.shouldDisplayPreview)}
      </div>
    );
  }
}
