'use strict';

import React                  from 'react';
import ProgressListItem       from './progress_list_item';

export default class ProgressDropdown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  navButtonClicked() {
    if (this.state && this.state.expanded) {
      this.setState({ expanded: !this.state.expanded });
    } else {
      this.setState({ expanded: true });
    }
  }

  selectQuestion(e, index) {
  }

  mouseOver(e) {
    e.preventDefault();
    e.target.style.backgroundColor = 'grey';
    e.target.style.color = 'white';
  }

  mouseOut(e) {
    e.target.style.backgroundColor = 'white';
    e.target.style.color = 'black';
  }

  render() {
    var expanded = (this.state && this.state.expanded);
    var questions = this.props.questions && this.props.questions.map((question, index)=>{
      return <ProgressListItem key={'list-item'+index} question={question} expanded={this.state && this.state.expanded} index={index} toggle={this.navButtonClicked} />
    });
    var text = this.props.disabled ? <b>There are {this.props.questionCount} questions</b> : <b>You are on question {this.props.currentQuestion} of {this.props.questionCount}</b>
    return (
      <span>
        <img alt="" src={this.props.settings.images.ProgressIcon_svg} />
        <button id="focus" className="btn" type="button" aria-haspopup="true" aria-expanded="true" onClick={() => { if (!this.props.disabled) this.navButtonClicked();}}>
          <div>Progress</div>
          <span>{text}</span>
          <span className="caret" />
        </button>
        <div aria-labelledby="dropdownMenu1">
          {questions}
        </div>
      </span>
    );
  }
}
