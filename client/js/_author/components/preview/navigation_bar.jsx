import React from 'react';
import Heading from '../common/heading';
import BackButton from '../common/back_button';
import appHistory from '../../history';


export default function NavigationBar() {
  const handleClick = () => {
    appHistory.push('/');
  };

  return (
    <Heading>
      <div className="au-c-header-bottom">
        <div className="au-c-header-bottom__left">
          <BackButton handleClick={handleClick} />
        </div>
      </div>
    </Heading>
  );
}
