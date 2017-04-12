import React                    from 'react';
import _                        from 'lodash';
import appHistory               from '../../history';
import Breadcrumb               from './breadcrumb';
import localize                 from '../../locales/localize';

function navigationBarContent(props) {

  const strings = props.localizeStrings('navigationBarContent');
  const button = props.currentBankId ? (
    <button
      className="au-c-btn au-c-btn--sm au-c-btn--maroon au-c-btn--new u-ml-md"
      onClick={() => appHistory.push(`banks/${props.currentBankId}/new_assessment`)}
    >
      {strings.new}
    </button>
  ) : null;

  return (
    <div className="au-c-header-bottom">
      <div className="au-c-header-bottom__left">
        <button
          onClick={() => props.updatePath(null)}
          className={props.currentBankId ? 'au-c-btn au-c-btn--breadcrumb' : 'au-c-btn au-c-btn--breadcrumb is-active'}
        >
          <i className="material-icons">home</i>
          {strings.assessment}
        </button>
        {
          _.map(props.path, folder => (
            <Breadcrumb
              key={`folder_${folder.id}`}
              {...folder}
              current={props.currentBankId === folder.id}
              updatePath={props.updatePath}
              getBankChildren={props.getBankChildren}
            />
            )
          )
        }
      </div>

      <div className="au-c-header-bottom__right">
        {button}
      </div>
    </div>
  );
}

navigationBarContent.propTypes = {
  path              : React.PropTypes.arrayOf(React.PropTypes.shape({})).isRequired,
  currentBankId     : React.PropTypes.string,
  updatePath        : React.PropTypes.func.isRequired,
  localizeStrings   : React.PropTypes.func.isRequired,
  getBankChildren   : React.PropTypes.func.isRequired
};

export default localize(navigationBarContent);
