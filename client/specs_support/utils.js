import TestUtils from 'react-addons-test-utils';
import _ from 'lodash';
import fs from 'fs';

export default {
  findTextField(textFields, labelText) {
    return _.find(textFields, (field) => {
      const label = TestUtils.findRenderedDOMComponentWithTag(field, 'label');
      return label.getDOMNode().textContent.toLowerCase() === labelText;
    });
  },
};

export function readFixture(path, encoding = 'utf8') {
  let basePath = '/specs_support/fixtures/';
  if (_.endsWith(process.cwd(), 'client')) {
    basePath = `${process.cwd()}${basePath}`;
  } else {
    basePath = `${process.cwd()}/client/${basePath}`;
  }
  return fs.readFileSync(`${basePath}${path}`, encoding);
}
