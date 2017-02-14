import React    from 'react';
import _        from 'lodash';
import Option   from './multiple_choice_option';
import Add      from './add_option';

export default function multipleChoice(props) {
  const hasQuestions = props.item.question
    && props.item.question.choices
    && props.item.question.choices.length;

  return (
    <div className="c-question__answers c-question__answers--maintain">
      {
        _.map(hasQuestions ? props.item.question.choices : [{}], choice => (
          <Option
            key={`assessmentChoice_${choice.id}`}
            {...choice}
            updateChoice={newChoice => props.updateChoice(props.item.id, newChoice)}
            updateItem={() => props.updateItem({ question: props.item.question })}
          />
        ))
      }
      <Add
        updateChoice={() => props.updateChoice(props.item.id, {})}
      />
    </div>
  );
}

multipleChoice.propTypes = {
  item: React.PropTypes.shape({
    answers: React.PropTypes.arrayOf(React.PropTypes.shape),
    id: React.PropTypes.string,
    question: React.PropTypes.shape({
      choices: React.PropTypes.arrayOf(React.PropTypes.shape({})),
    }),
  }).isRequired,
  updateChoice: React.PropTypes.func.isRequired,
};
