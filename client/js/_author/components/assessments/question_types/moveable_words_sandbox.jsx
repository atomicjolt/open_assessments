import React from 'react';

export default function() {

  return (
    <div>
      <div className="au-c-moveable__audio-settings is-active">
        <span>
          Audio record limit
        </span>
        <div className="au-c-input au-c-input--inline">
          <label htmlFor="audio-limit" />
          <div className="au-c-input__contain">
            <input
              className="au-c-text-input au-c-text-input--smaller"
              id="audio-limit"
              type="text"
              maxLength={3}
              defaultValue={100}
            />
            <div className="au-c-input__bottom" />
          </div>
        </div>
        <span>
          seconds. (240 maximum)
        </span>
      </div>
      <div className="au-c-question__answers au-c-moveable__answers">
        <div className="au-c-answer au-o-flex-center is-active">
          <div className="au-c-input">
            <label htmlFor="option1" />
            <div className="au-c-input__contain">
              <input
                className="au-c-text-input au-c-text-input--small au-c-wysiwyg"
                id="option1"
                type="text"
                placeholder="Option 1"
              />
              <div className="au-c-input__bottom" />
            </div>
          </div>
          <div className="au-c-dropdown au-c-dropdown--smaller au-u-ml-sm is-ordered">
            <label htmlFor />
            <select name id>
              <option value>Verb</option>
              <option value>Adverb</option>
              <option value>Noun</option>
              <option value>Pronoun</option>
              <option value>Adjective</option>
              <option value>Preposition</option>
            </select>
          </div>
          <button className="au-c-answer--delete">
            <i className="material-icons">close</i>
          </button>
        </div>
        <div className="au-c-answer au-o-flex-center">
          <div className="au-c-input">
            <label htmlFor="option2" />
            <div className="au-c-input__contain">
              <input
                className="au-c-text-input au-c-text-input--small au-c-wysiwyg au-c-option"
                id="option2"
                type="text"
                placeholder="Option 2"
              />
              <div className="au-c-input__bottom no-border" />
            </div>
          </div>
          <div className="au-c-dropdown au-c-dropdown--smaller au-u-ml-sm is-ordered">
            <label htmlFor />
            <select name id>
              <option value>Verb</option>
              <option value>Adverb</option>
              <option value>Noun</option>
              <option value>Pronoun</option>
              <option value>Adjective</option>
              <option value>Preposition</option>
            </select>
          </div>
          <button className="au-c-answer--delete">
            <i className="material-icons">close</i>
          </button>
        </div>
        <div className="au-c-answer au-o-flex-center au-c-answer--add">
          <div className="au-c-input">
            <label htmlFor="option2" />
            <div className="au-c-input__contain">
              <input
                className="au-c-text-input au-c-text-input--small au-c-wysiwyg au-c-option"
                id="option2"
                type="text"
                defaultValue="Add Option"
              />
              <div className="au-c-input__bottom no-border" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
