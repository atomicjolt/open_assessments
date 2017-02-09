import React           from 'react';
import AssessmentItems from './assessment_items';

export default function AssessmentForm(props) {
  return (
    <div className="o-contain">
      <div className="o-item">
        <div className="o-item__top">
          <div className="c-checkbox u-right">
            <input type="checkbox" id="check01" name="check" />
            <label htmlFor="check01">Single page assessment</label>
          </div>
        </div>
        <div className="c-assessment-title">
          <label htmlFor="title_field" className="c-input">
            <div className="c-input__contain">
              <input
                value={props.name}
                className="c-text-input c-text-input--large"
                type="text"
                id="title_field"
                placeholder="Untitled Assessment"
                onChange={e => props.updateStateAssessment('name', e.target.value)}
                onBlur={e => props.updateAssessment('name', e.target.value)}
              />
              <div className="c-input__bottom" />
            </div>
          </label>
        </div>
      </div>
      <AssessmentItems
        items={props.items}
        editItem={(itemIndex, field, data) =>
          props.editItem(itemIndex, field, data)}
        addItem={() => props.addItem()}
      />
      <div className="c-question-add">
        <button className="c-question-add__button">
          Add Question
        </button>
      </div>
    </div>
  );
}

AssessmentForm.propTypes = {};
