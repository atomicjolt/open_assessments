import React                    from 'react';
import _                        from 'lodash';
import appHistory               from '../../history';
import Breadcrumb               from './breadcrumb';

export default function navigationBarContent(props) {
  return (
    <div className="au-c-header-bottom">
      <div className="au-c-header-bottom__left">
        <button
          onClick={() => props.updatePath(null)}
          className={props.currentBankId ? 'au-c-btn au-c-btn--breadcrumb' : 'au-c-btn au-c-btn--breadcrumb is-active'}
        >
          <i className="material-icons">home</i>
          Assessments
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
        <button
          className="au-c-btn au-c-btn--sm au-c-btn--maroon au-c-btn--new u-ml-md"
          onClick={() => appHistory.push(`banks/${props.currentBankId}/new_assessment`)}
        >
          New
        </button>
      </div>
    </div>
  );
}

navigationBarContent.propTypes = {
  path              : React.PropTypes.arrayOf(React.PropTypes.shape({})).isRequired,
  currentBankId     : React.PropTypes.string,
  updatePath        : React.PropTypes.func.isRequired,
};
