import React            from 'react';
import _                from 'lodash';
import ImageOption      from './image_option';
import AddImage         from './add_image';


export default function ImageOrder(props) {
  const choices = props.item.question.choices;

  return (
    <div className="au-c-image-sequence__answers au-o-row">
      {
        _.map(choices, (choice, id) =>
          <div key={id} className="au-o-quarter">
            <ImageOption
              {...choice}
              updateChoice={
                (newChoice, fileIds) => props.updateChoice(
                    props.item.id, choice.id, newChoice, fileIds)
              }
              activateChoice={props.activateChoice}
              activeChoice={props.activeChoice}
              deleteChoice={props.deleteChoice}
              numChoices={_.size(choices)}
            />
          </div>
        )
      }
      <div className="au-o-quarter">
        <AddImage
          uploadScopeId={props.item.id}
          {...props}
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
  updateChoice: React.PropTypes.func.isRequired,
};
