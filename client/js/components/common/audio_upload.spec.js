import React        from 'react';
import ReactDOM     from 'react-dom';
import TestUtils    from 'react/lib/ReactTestUtils';
import { __RewireAPI__ as AudioUploadRewireApi } from './audio_upload';

import { localizeStrings }  from "../../selectors/localize";
import AudioUpload  from './audio_upload';

const FakeRecorder = React.createClass({
  render(){
    return null;
  }
});

describe('audio upload', () => {

  var result;
  var props;
  beforeEach(() => {
    props = {
      selectAnswer: () => {},
      localizedStrings: localizeStrings({settings:{locale:"en"}})
    };
    AudioUploadRewireApi.__Rewire__('Recorder', FakeRecorder);
    result = TestUtils.renderIntoDocument(<AudioUpload {...props} />);
  });

  afterEach(() => {
    AudioUploadRewireApi.__ResetDependency__('Recorder');
  });

  it('toggles recorder', () => {
    result.setState({recorder:'start'});
    result.toggle();

    expect(result.state.recorder).toEqual('stop');
  });

  it('toggles recorder', () => {
    result.setState({recorder:'stop'});
    result.toggle();

    expect(result.state.recorder).toEqual('start');
  });

});
