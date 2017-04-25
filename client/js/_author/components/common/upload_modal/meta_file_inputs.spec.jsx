import React            from 'react';
import { shallow }      from 'enzyme';
import MetaFileInputs   from './meta_file_inputs';

describe('MetaFileInputs component', () => {
  let props;
  let result;
  let updateFunction;

  beforeEach(() => {
    updateFunction = false;
    props = {
      metadataFileTypes: ['Spectastic'],
      labelName: () => {},
      updateMetadata: () => { updateFunction = true; },
    };
    result = shallow(<MetaFileInputs {...props} />);
  });

  it('matches the snapshot taken', () => {
    expect(result).toMatchSnapshot();
  });

  it('calls updateMetadata function', () => {
    expect(updateFunction).toBeFalsy();
    result.find('input').simulate('change', { target: { files: 'SPEC' } });
    expect(updateFunction).toBeTruthy();
  });
});
