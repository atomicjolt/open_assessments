// if you use jsx, you have to import React
import React                          from 'react';
import { Router, Route, IndexRoute }  from 'react-router';

import appHistory         from './history';
import Index              from './components/index';
import Assessment         from './components/main/assessment';
import Start              from './components/main/start';
import AssessmentResult   from './components/assessment_results/_assessment_result';
import NotFound           from './components/not_found';
import About              from './components/main/about';
import RetriesExceeded    from './components/main/retries_exceeded';
import AssessmentComplete from './components/main/assessment_complete';

export default (
  <Router history={appHistory}>
    <Route path="/" component={Index}>
      <IndexRoute component={Start} />
      <Route path="assessment" component={Assessment}/>
      <Route path="assessment-result" component={AssessmentResult} />
      <Route path="assessment-complete" component={AssessmentComplete} />
      <Route path="about" component={About}/>
      <Route path="retries-exceeded" component={RetriesExceeded} />
    </Route>
    <Route path='*' component={NotFound} />
  </Router>
);
