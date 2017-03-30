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
  return fs.readFileSync(`./specs_support/fixtures/${path}`, encoding);
}
