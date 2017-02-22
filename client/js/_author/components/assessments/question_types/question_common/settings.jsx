import React    from 'react';

export default function questionSettings(props) {
  return (
    <div className="c-question-settings">
      <div className="o-left">
        <div className="c-input c-input-label--left">
          <label htmlFor={`question_name_${props.id}`}>Name</label>
          <div className="c-input__contain">
            <input
              className="c-text-input c-text-input--smaller"
              id={`question_name_${props.id}`}
              type="text"
              tabIndex="0"
              defaultValue={props.defaultName}
              onBlur={e => props.updateItem({ name: e.target.value })}
            />
            <div className="c-input__bottom" />
          </div>
        </div>

        <div className="c-dropdown c-dropdown--small u-ml-md">
          <select
            name=""
            id=""
            tabIndex="0"
            value={props.language}
            onChange={e => props.updateState('nameLanguage', e.target.value)}
            onBlur={props.updateItem}
          >
            <option value="639-2%3AENG%40ISO">English</option>
            <option value="">French</option>
            <option value="">Spanish</option>
          </select>
        </div>
      </div>

      <div className="o-right">
        <div className="c-checkbox u-ml-md">
          <input
            type="checkbox"
            id={`check02_${props.id}`}
            name="check"
            tabIndex="0"
            onChange={e => props.updateItem({ question: { maintainOrder: e.target.checked } })}
            checked={props.maintainOrder ? 'checked' : null}
          />
          <label htmlFor={`check02_${props.id}`}>Maintain choice order</label>
        </div>
        <div className="c-checkbox u-ml-md">
          <input
            type="checkbox"
            id={`check03_${props.id}`}
            name="check"
            tabIndex="0"
            onChange={() => props.updateItem({ multipleAnswer: !props.multipleAnswer })}
            checked={props.multipleAnswer ? 'checked' : null}
          />
          <label htmlFor={`check03_${props.id}`}>Multiple answer</label>
        </div>
        <div className="c-checkbox u-ml-md">
          <input
            type="checkbox"
            id={`check04_${props.id}`}
            name="check"
            tabIndex="0"
            onChange={() => props.updateItem({ reflection: !props.reflection })}
            checked={props.reflection ? 'checked' : null}
          />
          <label htmlFor={`check04_${props.id}`}>Reflection</label>
        </div>
      </div>
    </div>
  );
}

questionSettings.propTypes = {
  id: React.PropTypes.string.isRequired,
  defaultName: React.PropTypes.string,
  language: React.PropTypes.string.isRequired,
  updateItem: React.PropTypes.func.isRequired,
  maintainOrder: React.PropTypes.bool,
  multipleAnswer: React.PropTypes.bool,
  reflection: React.PropTypes.bool,
};
