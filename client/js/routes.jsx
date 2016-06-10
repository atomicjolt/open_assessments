"use strict";

import React                          from 'react'; // if you use jsx, you have to have React imported
import { Router, Route, IndexRoute }  from 'react-router';

import appHistory         from './history';
import Index              from './components/index';
import Assessment         from './components/main/assessment';
import Start              from './components/main/start';
import AssessmentResult   from './components/assessment_results/_assessment_result';
import NotFound           from './components/not_found';
import About              from './components/main/about';


export default (
  <Router history={appHistory}>
    <Route path="/" component={Index}>
      <IndexRoute component={Start} />
      <Route path="assessment" handler={Assessment}/>
      <Route path="assessment-result" handler={AssessmentResult}/>
      <Route path="about" handler={About}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);
