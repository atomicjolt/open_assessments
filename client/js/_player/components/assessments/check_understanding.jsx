"use strict";

import React              from "react";
import { connect }        from "react-redux";

import { start }          from "../../actions/assessment_progress";
import history            from "../../history";

const select = (state) => {

  const role = _.isEmpty(state.settings.lti) ? state.settings.role : state.settings.lti.lti_role;

  return {
    title               : state.settings.title,
    maxAttempts         : state.settings.max_attempts,
    userAttempts        : state.settings.user_attempts,
    assessmentId        : state.settings.assessment_id,
    assessmentKind      : state.settings.assessment_kind,
    icon                : state.settings.images.QuizIcon_svg,
    role
  };
};

export class CheckUnderstanding extends React.Component{

  start(assessmentId, context){
    this.props.start(assessmentId);
    history.push(`assessment`);
  }

  manageAttempts(){
    history.push(`attempts/${this.props.assessmentId}`);
  }

  previewAttempt(){
    history.push(`preview/${this.props.assessmentId}`);
  }

  getAttempts(){
    if (this.props.userAttempts >= this.props.maxAttempts && this.props.role != "admin"){
      return (
        <div>
          <div>
          <h1>Oops!</h1>
          <h3>You have already taken this quiz the maximum number of times</h3>
        </div>
        <h4><u>TIPS:</u></h4>
        <div>
          <ul>
            <li>{"Right now you can do three things to make sure you are ready for the next performance assessment: review the material in this module, use the self-checks to see if you're getting it, and ask your peers or instructor for help if you need it."}</li>
            <li>{"In the future, allow enough time between your first and last quiz attempts to get help from your instructor before the last attempt!"}</li>
          </ul>
        </div>
      </div>
      );
    }
    var attempt = "";
    // right now only 2 attempts are allowed or other things will break
    switch(this.props.userAttempts+1){
      case 1: attempt = "1st"; break;
      case 2: attempt = "2nd"; break;
      default: "1st";
    }
    var attemptStructure = <div>
        <div> You can take this quiz twice. Your highest score will count as your grade. Don't wait until the last minute to take the quiz - take the quiz early so you'll have plenty of time to study and improve your grade on your second attempt.</div>
          <div>
          <h4>Attempt</h4>
          <h1>{this.props.userAttempts + 1}</h1>
          <h3>of {this.props.maxAttempts}</h3>
          <p>This is your {attempt} attempt for this quiz</p>
        </div>
      </div>;
    if(!this.props.is_lti){
      attemptStructure = "";
    }
    return attemptStructure;

  }

  getSWYK(){
    return <div>
              <h2>Show What You Know</h2>
              <div>Take this pre-test to see what you already know about the concepts in this section.</div>
              <div>The pre-test does not count toward your grade, but will help you plan where to focus</div>
              <div>your time and effort as you study. The pre-test is optional.</div>
            </div>;
  }

  canManage(){
    return this.props.assessmentKind == "SUMMATIVE" && this.props.role == "admin" && this.props.is_lti;
  }

  getFormative(){
    // THIS IS THE FRAME FOR CANDELLA SO ITS NOT BEING USED BUT ITS GOOD CODE
    // THAT WE MIGHT REUSE LATER

    // <div className="col-md-1"><img style={styles.icon} src={this.props.icon} /></div>
    //           <div className="col-md-10" style={styles.data}>
    //             <div>Quiz: [PRIMARY OUTCOME TITLE]</div>
    //             <div style={styles.selfCheck}><b>Self-Check</b></div>
    //             <div>{this.props.primaryOutcome.longOutcome}</div>
    //           </div>
    //         </div>
    //         <hr />
    return <div>
              <div className="row">
              </div>
              <div className="row">
                <div className="col-md-10 col-sm-9">
                  <h4>{this.props.title}</h4>
                </div>
                <div className="col-md-2 col-sm-3">
                  <button className="btn btn-info" onClick={()=>{ this.start(this.props.assessmentId); }}>Start Quiz</button>
                </div>
              </div>
           </div>;
  }

  render() {
    var buttonText = "Start Quiz";
    var content = "There was an error, contact your teacher.";

    if(this.props.assessmentKind == "SUMMATIVE"){
      content = this.getAttempts();
    } else if(this.props.assessmentKind == "SHOW_WHAT_YOU_KNOW"){
      content = this.getSWYK();
      buttonText = "Start Pre-test";
    } else if(this.props.assessmentKind == "FORMATIVE"){
      content = this.getFormative();
    }

    var startButton = (
      <div>
        <button className="btn btn-info" onClick={()=>{this.start(this.props.assessmentId);}}>{buttonText}</button>
      </div>);
    if (this.props.userAttempts >= this.props.maxAttempts && this.props.assessmentKind == "SUMMATIVE" && this.props.role != "admin"){
      startButton = "";
    }
    if (this.props.assessmentKind == "FORMATIVE"){
      startButton = "";
    }

    var teacherOptions = null;
    if(this.canManage()){
      teacherOptions = (
        <div>
          <button className="btn btn-sm" onClick={()=>{this.manageAttempts();}}>Manage Quiz Attempts</button>
          <button className="btn btn-sm" onClick={()=>{this.previewAttempt();}}>Answer Key</button>
        </div>
      );
    }

    return (
      <div className="assessment_container">
        {teacherOptions}
        <div className="question">
          <div className="header">
            <p>{this.props.name}</p>
          </div>
          <div className="full_question">
            {content}
            {startButton}
          </div>
        </div>
      </div>
    );
  }

}

export default connect(select, { start }, null, {withRef: true})(CheckUnderstanding);
