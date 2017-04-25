import React          from 'react';
import assets         from '../../../libs/assets';
import BanksView      from '../bank_navigation/navigation_bar_content';
import AssessmentView from '../assessments/navigation_bar_content';

export default function heading(props) {
  const logo = assets('./_author/images/CLIx-logo.png');

  const content = () => {
    switch (props.view) {
      case 'banks':
        return (
          <BanksView {...props} />
        );
      case 'assessments':
        return (
          <AssessmentView {...props} />
        );
      default:
        return props.children;
    }
  };

  return (
    <header className="au-c-header">
      <div className="au-c-header-top">
        <img src={logo} alt="CLI Logo" className="au-c-logo" />
      </div>
      {content()}
    </header>
  );
}

heading.propTypes = {
  view: React.PropTypes.string,
  children: React.PropTypes.node,
};
