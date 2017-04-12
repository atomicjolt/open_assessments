import React              from 'react';
import { shallow }        from 'enzyme';
import SettingsCheckbox   from './settings_checkbox';

describe('the settings_checkbox component', () => {
  let props;
  let result;

  beforeEach(() => {
    props = {
      id: '7',
      updateItem: () => {},
      makeReflection: () => {},
      multipleAnswer: false,
      shuffle: false,
      reflection: false,
    };

    result = shallow(<SettingsCheckbox {...props} />);
  });

  it('renders 3 labels', () => {
    expect(result.find('label').length).toBe(3);
  });

  it('expects the first box to be checked', () => {
    const firstBox = result.find('#check02_7').html();
    expect(firstBox).toBeChecked();
    props.shuffle = true;
    result = shallow(<SettingsCheckbox {...props} />);
    const checkBox = result.find('#check03_7').html();
    expect(checkBox).not.toBeChecked();
  });

  it('expects the second box to be checked', () => {
    const secondBox = result.find('#check03_7').html();
    expect(secondBox).not.toBeChecked();
    props.multipleAnswer = true;
    result = shallow(<SettingsCheckbox {...props} />);
    const checkBox = result.find('#check03_7').html();
    expect(checkBox).toBeChecked();
  });

  it('expects the third box to be checked', () => {
    const thirdBox = result.find('#check04_7').html();
    expect(thirdBox).not.toBeChecked();
    props.reflection = true;
    result = shallow(<SettingsCheckbox {...props} />);
    const checkBox = result.find('#check04_7').html();
    expect(checkBox).toBeChecked();
  });
});
