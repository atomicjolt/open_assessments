import React    from 'react';
import Option   from './multiple_choice_option';
import Add      from './add_option';

export default function multipleChoice(props) {
  console.log(props);
  return (
    <div className="c-question__answers c-question__answers--maintain">
      {
        _.map(props.item.answers.length ? props.item.answers : [{}], choice => (
          <Option {...choice} />
        ))
      }
      <Add />
    </div>
  );
}

multipleChoice.propTypes = {
  item: React.PropTypes.shape({
    answers: React.PropTypes.arrayOf(React.PropTypes.shape),
  }).isRequired,
};
