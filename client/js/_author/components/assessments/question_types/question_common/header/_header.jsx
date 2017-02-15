import React            from 'react';
import InactiveHeader   from './inactive';
import ReorderHeader    from './reorder';

export default function QuestionHeader(props) {
  const type = () => {
    switch (props.type) {
      case 'item-genus-type%3Aqti-choice-interaction%40ODL.MIT.EDU':
        return 'Multiple Choice';
      default:
        return 'Question';
    }
  };

  let currentHeader = <InactiveHeader {...props} type={type()} />;

  if (props.reorderActive) {
    currentHeader =  <ReorderHeader {...props} type={type()} />;
  }

  return (
    <div className="o-item__top">
      <div className="o-left">
        <h3 className="c-question__number">Question {props.index + 1}</h3>
        <div className="c-question__type">&nbsp;&nbsp; - &nbsp;&nbsp; {props.type}</div>
      </div>
      { currentHeader }
    </div>
  );
}

QuestionHeader.propTypes = {
  reorderActive: React.PropTypes.bool,
  type: React.PropTypes.string,
  index: React.PropTypes.number,
};
