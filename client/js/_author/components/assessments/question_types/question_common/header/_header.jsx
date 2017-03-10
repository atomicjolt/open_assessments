import React            from 'react';
import _                from 'lodash';
import DefaultHeader    from './default';
import ReorderHeader    from './reorder';
import PreviewHeader    from './preview';

export default function QuestionHeader(props) {
  const typeName = _.words(_.upperFirst(props.type)).join(' ');

  let currentHeader = <DefaultHeader {...props} />;
  if (props.reorderActive) {
    currentHeader =  <ReorderHeader {...props} />;
  }
  if (props.preview) {
    currentHeader =  <PreviewHeader {...props} />;
  }

  return (
    <div className="au-o-item__top">
      <div className="au-o-left">
        <h3 className="au-c-question__number">Question {props.index + 1}</h3>
        <div className="au-c-question__type">&nbsp;&nbsp; - &nbsp;&nbsp; {typeName}</div>
      </div>
      { currentHeader }
    </div>
  );
}

QuestionHeader.propTypes = {
  reorderActive: React.PropTypes.bool,
  type: React.PropTypes.string,
  index: React.PropTypes.number,
  preview: React.PropTypes.bool,
};
