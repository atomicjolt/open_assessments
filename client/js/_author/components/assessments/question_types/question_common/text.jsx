import React      from 'react';
import { Editor } from 'react-draft-wysiwyg';

export default class questionText extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.text !== prevProps.text) {
      this.description.value = this.props.text;
    }
  }

  uploadImage(file) {
    return new Promise((resolve, reject) => {
      this.props.uploadImage(file, resolve);
    });
  }

  render() {
    return (
      <div className="c-input c-question-text">
        <label htmlFor={`question_text_${this.props.id}`} />
        <div className="c-input__contain">
          {
            /*
              This is how to pass the prop for uploading images to the editor.
              <Editor
                toolbar={{
                  image: {
                    uploadCallback: file => this.uploadImage(file)
                  }
                }}
              />
            */
          }
          <input
            ref={ref => (this.description = ref)}
            className="c-text-input c-text-input--medium c-wysiwyg"
            id={`question_name_${this.props.id}`}
            type="text"
            placeholder="Question Text"
            tabIndex="0"
            defaultValue={this.props.text}
            onBlur={e => this.props.updateItem({ description: e.target.value })}
          />
          <div className="c-input__bottom" />
        </div>
      </div>
    );
  }
}

questionText.propTypes = {
  id: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
  updateItem: React.PropTypes.func.isRequired,
  uploadImage: React.PropTypes.func.isRequired,
};
