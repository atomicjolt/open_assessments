"use strict";

import React                          from 'react'; // if you use jsx, you have to have React imported
import { Router, Route, IndexRoute }  from 'react-router';
import { hashHistory }                from 'react-router';

import Index              from './components/index';
import Assessment         from './components/main/assessment';
import Start              from './components/main/start';
import Attempts           from './components/main/attempts';
import AssessmentResult   from './components/assessment_results/assessment_result';
import TeacherReview      from './components/assessment_results/teacher_review';
import TeacherPreview     from './components/assessment_results/teacher_preview';
import Login              from './components/sessions/login';
import Logout             from './components/sessions/logout';
import Register           from './components/users/register';
import NotFound           from './components/not_found';
import About              from './components/main/about';


export default (
  <Router history={hashHistory}>
    <Route path="/" component={Index}>
      <IndexRoute component={Start} />
      <Route path="assessment" handler={Assessment}/>
      <Route path="assessment-result" handler={AssessmentResult}/>
      <Route path="review/:assessmentId/:attempdId" handler={TeacherReview} /> //teacher-review
      <Route path="preview/:assessmentId" handler={TeacherPreview} /> // path="teacher-preview"
      <Route path="login" handler={Login}/>
      <Route path="register" handler={Register}/>
      <Route path="logout" handler={Logout}/>
      <Route path="about" handler={About}/>
      <Route path="attempts/:assessmentId/:contextId" handler={Attempts} /> //path="attempts"
      <NotFoundRoute handler={NotFound}/>
    </Route>
  </Router>
);