import React      from 'react';

export default class questionText extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.text !== prevProps.text) {
      this.description.value = this.props.text;
    }
  }

  render() {
    return (
      <div className="c-input c-question-text">
        <label htmlFor={`question_text_${this.props.id}`} />
        <div className="c-input__contain">
          <input
            ref={ref => (this.description = ref)}
            className="c-text-input c-text-input--medium c-wysiwyg"
            id={`question_name_${this.props.id}`}
            type="text"
            placeholder="Question Text"
            tabIndex="0"
            defaultValue={this.props.text}
            onBlur={e => this.props.updateItem({ question: { text: e.target.value } })}
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
};
