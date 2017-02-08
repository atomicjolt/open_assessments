import React                    from 'react';
import _                        from 'lodash';
import { hashHistory }          from 'react-router';
import { colors, buttonStyle }  from '../../defines';
import Breadcrumb               from './breadcrumb';

export default function navigationBarContent(props) {
  return (
    <div className="c-header-bottom">
      <div className="c-header-bottom__left">
        <button
          onClick={() => props.updatePath(null)}
          className={props.currentBankId ? 'c-btn c-btn--breadcrumb' : 'c-btn c-btn--breadcrumb is-active'}
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
            />
            )
          )
        }
      </div>

      <div className="c-header-bottom__right">
        <button
          onClick={() => hashHistory.push(`banks/${props.currentBankId}/new_assessment`)}
          className="c-btn c-btn--sm c-btn--maroon c-btn--new u-ml-md"
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
