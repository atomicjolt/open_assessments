import React            from 'react';
import { shallow }      from 'enzyme';
import DropObject       from './drop_object';
import { languages }    from '../../../../../constants/language_types';

describe('drop_object component', () => {
  let props;
  let result;
  let calledSetActive;
  let updatedObject;

  beforeEach(() => {
    calledSetActive = false;
    updatedObject = false;
    props = {
      object: {
        id: '7',
        label: 'Spec',
        labels: {
          [languages.languageTypeId.english]: 'Spec'
        },
      },
      language: languages.languageTypeId.english,
      zones: {},
      updateObject: () => { updatedObject = true; },
      setActive: () => { calledSetActive = true; },
      isActive: false,
    };
    result = shallow(<DropObject {...props} />);
  });

  it('renders a snapshot of the component', () => {
    expect(result).toMatchSnapshot();
  });

  it('calls the setActive function with onClick', () => {
    expect(calledSetActive).toBeFalsy();
    result.find('.au-set-active').simulate('click');
    expect(calledSetActive).toBeTruthy();
  });

  it('calls the updateObject function with button click', () => {
    expect(updatedObject).toBeFalsy();
    result.find('button').simulate('click');
    expect(updatedObject).toBeTruthy();
  });

  it('calls the updateObject function on blur', () => {
    expect(updatedObject).toBeFalsy();
    result.find('input').simulate('blur', { target: { value: 'lasers are neat' } });
    expect(updatedObject).toBeTruthy();
  });
});
