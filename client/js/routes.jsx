'use strict';

import React                          from 'react'; // if you use jsx, you have to have React imported
import { Router, Route, IndexRoute }  from 'react-router';

import appHistory         from './history';
import Index              from './components/index';
import Assessment         from './components/main/assessment';
import Start              from './components/main/start';
import AssessmentResult   from './components/assessment_results/_assessment_result';
import NotFound           from './components/not_found';
import About              from './components/main/about';
import RetriesExceeded    from './components/main/retries_exceeded';

// @todo: replace this with a `real` component or template
//const NotFound = () => (
//  <div>
//    <h1>Page Not Found</h1>
//    <p>Sorry, but the page you were trying to view does not exist.</p>
//  </div>
//);

export default (
  <Router history={appHistory}>
    <Route path="/" component={Index}>
      <IndexRoute component={Start} />
      <Route path="assessment" component={Assessment}/>
      <Route path="assessment-result" component={AssessmentResult}/>
      <Route path="about" component={About}/>
      <Route path="retries-exceeded" component={RetriesExceeded} />
      <Route path="*" component={NotFound}/>
    </Route>
    <Route path='*' component={NotFound} />
  </Router>
);
