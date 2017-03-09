import React      from 'react';

export default function settingsCheckbox(props) {
  return (
    <div className="au-o-right">
      <div className="au-c-checkbox au-u-ml-md">
        <input
          type="checkbox"
          id={`check02_${props.id}`}
          name="check"
          tabIndex="0"
          onChange={e => props.updateItem({ question: { shuffle: !e.target.checked } })}
          checked={!props.shuffle}
        />
        <label htmlFor={`check02_${props.id}`}>Maintain choice order</label>
      </div>
      <div className="au-c-checkbox au-u-ml-md">
        <input
          type="checkbox"
          id={`check03_${props.id}`}
          name="check"
          tabIndex="0"
          onChange={() => props.makeMultipleAnswer()}
          checked={props.multipleAnswer ? 'checked' : null}
        />
        <label htmlFor={`check03_${props.id}`}>Multiple answer</label>
      </div>
      <div className="au-c-checkbox au-u-ml-md">
        <input
          type="checkbox"
          id={`check04_${props.id}`}
          name="check"
          tabIndex="0"
          onChange={e => props.makeReflection(e.target.checked)}
          checked={props.reflection ? 'checked' : null}
        />
        <label htmlFor={`check04_${props.id}`}>Reflection</label>
      </div>
    </div>
  );
}

settingsCheckbox.propTypes = {
  id: React.PropTypes.string.isRequired,
  updateItem: React.PropTypes.func.isRequired,
  makeReflection: React.PropTypes.func.isRequired,
  multipleAnswer: React.PropTypes.bool,
  shuffle: React.PropTypes.bool,
  reflection: React.PropTypes.bool,
};
