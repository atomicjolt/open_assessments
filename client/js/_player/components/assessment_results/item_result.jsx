"use strict";

import React            from 'react';
import UniversalInput   from '../assessments/universal_input';
import ResultConfidence from './result_confidence';
import ResultOutcome    from "./result_outcome";

export default class ItemResult extends React.Component{

  static propTypes = {
    question: React.PropTypes.object.isRequired,
    confidence: React.PropTypes.string.isRequired,
    isCorrect: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool]).isRequired
  };

  confidenceResult() {
    if (this.props.confidence !== null) {
      return <div>
        <ResultConfidence level={this.props.confidence}/>
      </div>
    } else {
      return '';
    }
  }

  render() {
    var correctMessage = "You were incorrect.";
    if(this.props.isCorrect == "partial"){
      correctMessage = "You were partially correct."
    } else if(this.props.isCorrect === true){
      correctMessage = "You were correct.";
    } else if(this.props.isCorrect === "teacher_preview"){
      correctMessage = ""
    }
    return (
      <div tabIndex="0" aria-label={"Question " + (this.props.index+1)}>
        <div className="row" tabIndex="0">
          <div className="col-md-9 col-sm-9 col-xs-9">
            <div className="row">
              <div className="col-md-9 col-sm-9 col-xs-9">
              <div
                dangerouslySetInnerHTML={{
                  __html: this.props.question.material
              }}></div>
              </div>
              <div className="col-md-3 col-sm-3 col-xs-3" tabIndex="0">
                <div>{correctMessage}</div>
              </div>
            </div>
            <div>
              <UniversalInput item={this.props.question} isResult={true} chosen={this.props.chosen} correctAnswers={this.props.correctAnswers}/>
            </div>
            {this.confidenceResult()}
          </div>
          <div className="col-md-3 col-sm-3 col-xs-3">
            <ResultOutcome outcomes={this.props.question.outcomes} correct={this.props.isCorrect} level={this.props.confidence}/>
          </div>
        </div>
        <div className="row">
        </div>
        <hr />
      </div>
    );
  }

}
