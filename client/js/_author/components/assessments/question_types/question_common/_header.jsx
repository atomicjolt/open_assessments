import React            from 'react';
import InactiveHeader   from './inactive_h';
import ReorderHeader    from './reorder_h';

export default function QuestionHeader(props) {
  const type = () => {
    switch (props.type) {
      case 'item-genus-type%3Aqti-choice-interaction%40ODL.MIT.EDU':
        return 'Multiple Choice';
      default:
        return 'Question';
    }
  };

  if (props.reorderActive) {
    return <ReorderHeader {...props} type={type()} />;
  }

  return <InactiveHeader {...props} type={type()} />;
}

QuestionHeader.propTypes = {
  reorderActive: React.PropTypes.bool,
  type: React.PropTypes.string,
};
