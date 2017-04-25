import _       from 'lodash';
import server  from './server';

// Override endpoints as needed. Right now rails and oea are the same so we just go with {}
export default _.merge(server, {});
