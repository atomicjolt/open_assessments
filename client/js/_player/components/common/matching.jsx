import React              from 'react';
import { connect }        from 'react-redux';
import _                  from 'lodash';

import { answerSelected } from '../../actions/assessment';
import { makeId }         from '../../../utils/utils';

export class Matching extends React.Component {

  static propTypes = {
    item: React.PropTypes.object.isRequired
  }

  answerSelected(e, key) {
    var target = e.target.parentNode.firstChild.textContent;
    var selectedAnswer = e.currentTarget.value;
    var answerNumber = e.currentTarget.name;
    var answerId = e.currentTarget.children[e.currentTarget.selectedIndex].id;
    var item = {
      id: target,
      selectedAnswer: selectedAnswer,
      answerNumber: answerNumber,
      item: this.props.item,
      answerId: answerId
    };

    this.props.answerSelected(item);
  }

  getResponses(item){
    var responses = [];
    for(var i = 0; i < item.correct.length; i++){
      var response = {
        id: item.correct[i].id,
        material: '',
        answers: []
      };
      for(var j =0; j < item.answers.length/item.correct.length; j++){
        response.material = item.answers[j].matchMaterial;
        response.answers.push(item.answers[j]);
      }
      responses.push(response);
    }
    return responses;
  }

  getMaterialNames(){
    return _.chain(this.props.item.answers)
    .map((answer, i) => {
      return answer.matchMaterial;
    })
    .uniq()
    .value();
  }

  render(){
    var responses = this.getResponses(this.props.item);
    var materialNames = this.getMaterialNames();

    var materialItems = responses.map((item, index)=>{
      var name = "answer-" + index;
      var ref = "response-" + item.id;

      var answers = (this.props.studentAnswers) ? this.props.studentAnswers[index] : {selectedAnswer: ""};
      var selectedAnswer;
      var options = item.answers.map((answer, i)=>{
        if(answers && (answers.selectedAnswer.trim() == answer.material.trim())){
          selectedAnswer = answers.selectedAnswer.trim();
        }
        return <option key={"answer-" + answer.id} value={answer.material.trim()} id={answer.id}>{answer.material.trim()}</option>;
      });
      var select = !this.props.isDisabled ? <select name={name} value={selectedAnswer} onChange={(e, key) => {this.answerSelected(e, key); }}>
                                              <option selected={null} id="0000">[Select Answer]</option>
                                              { options }
                                            </select> : <select disabled="true" name={name} onChange={(e, key) => {this.answerSelected(e, key); }}>
                                                          <option selected={null} id="0000"></option>
                                                          <option selected={null} id="0000">--------------------------------------</option>
                                                        </select>;
      return <div key={ref} >
        {materialNames[index]}
        {select}
      </div>;
    });

    return(
      <div>
        {materialItems}
      </div>
    );
  }
}

export default connect(null, { answerSelected }, null, { withRefs: true })(Matching);
