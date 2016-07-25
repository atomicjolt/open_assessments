import React        from 'react';
import ReactDOM     from 'react-dom';
import TestUtils    from 'react/lib/ReactTestUtils';

import { localizeStrings }  from "../../selectors/localize";
import AudioUpload  from './audio_upload';

describe('audio upload', () => {

  var props = {
    selectAnswer: () => {},
    localizedStrings: localizeStrings({settings:{locale:"en"}})
  };

  it('toggles recorder', () => {
    var result = TestUtils.renderIntoDocument(<AudioUpload {...props} />);
    result.setState({recorder:'start'});
    result.toggle();

    expect(result.state.recorder).toEqual('stop');
  });

  it('toggles recorder', () => {
    var result = TestUtils.renderIntoDocument(<AudioUpload {...props} />);
    result.setState({recorder:'stop'});
    result.toggle();

    expect(result.state.recorder).toEqual('start');
  });

});
