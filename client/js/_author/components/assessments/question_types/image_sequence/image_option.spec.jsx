import React          from 'react';
import { shallow }    from 'enzyme';
import renderer       from 'react-test-renderer';
import ImageOption    from './image_option';

describe('image_option component', () => {
  let props;
  let result;
  let activatedChoice;
  let updatedChoice;
  let inputUpdate;

  beforeEach(() => {
    inputUpdate = false;
    activatedChoice = false;
    updatedChoice = false;
    props = {
      deleteChoice: () => {},
      updateChoice: () => {
        updatedChoice = true;
        inputUpdate = true;
      },
      activateChoice: () => { activatedChoice = true; },
      id: '7',
      text: 'sample_text',
      labelText: '',
      order: 2,
      numChoices: 3,
      localizedStrings: () => {},
    };
    result = shallow(<ImageOption {...props} />);
  });

  it('renders a snapshot', () => {
    const tree = renderer.create(<ImageOption text={props.text} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls activateChoice function', () => {
    expect(activatedChoice).toBeFalsy();
    result.find('.au-c-image-sequence-answer').simulate('click');
    expect(activatedChoice).toBeTruthy();
  });

  it('calls updateChoice function on select change', () => {
    expect(updatedChoice).toBeFalsy();
    result.find('select').simulate('change', { target: { value: 4 } });
    expect(updatedChoice).toBeTruthy();
  });

  it('calls updateChoice on input change', () => {
    expect(inputUpdate).toBeFalsy();
    result.find('input').simulate('blur', { target: { value: 2 } });
  });
});
