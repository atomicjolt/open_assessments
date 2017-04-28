import React            from 'react';
import _                from 'lodash';
import ImageOption      from './image_option';
import AddImage         from './add_image';


export default function ImageOrder(props) {
  const choices = props.item.question.choices;

  return (
    <div className="au-c-image-sequence__answers au-o-row">
      {
        _.map(choices, (choice, id) => {
          const text = _.get(choice, `texts[${props.language}].text`, '');
          const labelText = _.get(choice, `texts[${props.language}].labelText`, '');
          return (
            <div key={`${id}_${props.language}`} className="au-o-quarter">
              <ImageOption
                id={id}
                text={text}
                order={choice.order}
                labelText={labelText}
                updateChoice={
                  (newChoice, fileIds) => props.updateChoice(
                      props.item.id, choice.id, newChoice, fileIds)
                }
                activateChoice={props.activateChoice}
                activeChoice={props.activeChoice}
                deleteChoice={props.deleteChoice}
                numChoices={_.size(choices)}
                duplicateAnswers={props.duplicateAnswers}
                item={props.item}
                language={props.language}
              />
            </div>
          );
        })
      }
      <div className="au-o-quarter">
        <AddImage
          item={props.item}
          language={props.language}
        />
      </div>
    </div>
  );
}

ImageOrder.propTypes = {
  item: React.PropTypes.shape({
    id: React.PropTypes.string,
    question: React.PropTypes.shape({
      choices: React.PropTypes.shape({})
    })
  }),
  deleteChoice: React.PropTypes.func,
  duplicateAnswers: React.PropTypes.arrayOf(React.PropTypes.string),
  language: React.PropTypes.string
};
