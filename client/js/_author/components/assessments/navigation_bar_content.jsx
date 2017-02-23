import React            from 'react';
import _                from 'lodash';
import { hashHistory }  from 'react-router';
import Icon             from '../bank_navigation/bank_icon';

export default function AssessmentsView(props) {

  const publishButton = () => {
    if (!_.isEmpty(props.items)) {
      return (
        <button
          className="c-btn c-btn--sm c-btn--green"
          onClick={() => props.editOrPublishAssessment(props.isPublished)}
        >
          <Icon type={props.isPublished ? 'Published' : 'Publish'} />
          {props.isPublished ? 'Unpublish' : 'Publish'}
        </button>
      );
    }
    return null;
  };

  return (
    <div className="c-header-bottom">
      <div className="c-header-bottom__left">
        <button
          onClick={() => hashHistory.push('/')}
          className="c-btn c-btn--sm c-btn--outline c-btn--back"
        >
          <i className="material-icons">keyboard_arrow_left</i>
          Back
        </button>
      </div>

      <div className="c-header-bottom__right">
        { publishButton() }
        <button className="c-btn c-btn--sm c-btn--maroon u-ml-md">
          <i className="material-icons">remove_red_eye</i>
          Preview Assessment
        </button>
      </div>
    </div>
  );
}

AssessmentsView.propTypes = {
  editOrPublishAssessment: React.PropTypes.func.isRequired,
  isPublished: React.PropTypes.bool.isRequired,
  items: React.PropTypes.shape({}).isRequired,
};
