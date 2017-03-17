import React            from 'react';
import _                from 'lodash';
import ImageOption      from './image_option';
import AddImage         from './add_image';


export default function ImageOrder(props) {
  return (
    <div className="au-c-image-sequence__answers au-o-row">
      {
        _.map(props.item.question.choices, choice => (
          <div className="au-o-quarter">
            <ImageOption
              key={choice.text} {...choice}
              activateChoice={props.activateChoice}
              activeChoice={props.activeChoice}
              deleteChoice={props.deleteChoice}
            />
          </div>
          )
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
};
