// if you use jsx, you have to import React
import React                          from 'react';
import { Router, Route, IndexRoute }  from 'react-router';

import appHistory                     from './history';
import Index                          from './components/_index';
import BankNav                        from './components/bank_navigation/_bank_navigator';
import NewAssessment                  from './components/assessments/_new_assessment';
import EditAssessment                 from './components/assessments/_edit_assessment';
import PreviewAssessment              from './components/preview/preview_assessment';
import NotFound                       from './components/common/not_found';

export default (
  <Router history={appHistory}>
    <Route path="/" component={Index}>
      <IndexRoute component={BankNav} />
      <Route path="banks/:id/new_assessment" component={NewAssessment} />
      <Route path="banks/:bankId/assessments/:id" component={EditAssessment} />
      <Route path="banks/:bankId/assessments/:id/preview" component={PreviewAssessment} />
    </Route>
    <Route path="*" component={NotFound} />
  </Router>
);
