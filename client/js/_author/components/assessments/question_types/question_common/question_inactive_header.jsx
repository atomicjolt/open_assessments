import React    from 'react';

export default function inactiveHeader(props) {

  const type = () => {
    switch (props.type) {
      case 'item-genus-type%3Aqti-choice-interaction%40ODL.MIT.EDU':
        return 'Multiple Choice';
      default:
        return 'Question';
    }
  };

  return (
    <div className="o-item__top">
      <div className="o-left">
        <h3 className="c-question__number">{props.name}</h3>
        <div className="c-question__type">&nbsp;&nbsp; - &nbsp;&nbsp; {type()}</div>
      </div>

      <div className="o-right c-question-icons">
        <button className="c-btn c-btn--square" tabIndex="-1"><i className="material-icons">remove_red_eye</i></button>
        <button className="c-btn c-btn--square" tabIndex="-1"><i className="material-icons">swap_vert</i></button>
        <button className="c-btn c-btn--square" tabIndex="-1"><i className="material-icons">delete</i></button>
      </div>
    </div>
  );
}

inactiveHeader.propTypes = {
  name: React.PropTypes.string,
  type: React.PropTypes.string,
};
