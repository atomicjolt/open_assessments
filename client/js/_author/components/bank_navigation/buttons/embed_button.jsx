import React from 'react';
import _ from 'lodash';
import CopyToClipboard  from 'react-copy-to-clipboard';

export default function EmbedButton(props) {
  const { assessment, baseEmbedUrl, getEmbedCode } = props;
  const isPublished = assessment.isPublished;
  const assessOffered = _.get(assessment, 'assessmentOffered[0]');

  if (isPublished) {
    if (assessOffered) {
      const embedUrlCode = `${baseEmbedUrl}&bank=${assessOffered.bankId}&assessment_offered_id=${assessOffered.id}#/assessment`;

      return (
        <div className="au-c-embed-contain">
          <label className="au-c-input--purple" htmlFor="embedInput">
            <input
              id="embedInput"
              onClick={e => e.stopPropagation()}
              className="au-c-text-input au-c-text-input--smaller"
              readOnly
              type="text"
              value={`<iframe src="${embedUrlCode}"/>`}
            />
          </label>
          <CopyToClipboard text={`<iframe src="${embedUrlCode}"/>`}>
            <button
              className="au-c-btn au-c-btn--square au-c-btn--embed "
              onClick={e => e.stopPropagation()}
              onFocus={props.onFocus}
            >
              <i className="material-icons">content_paste</i>
            </button>
          </CopyToClipboard>
        </div>
      );
    }
    return (
      <button
        className="au-c-btn au-c-btn--sm au-c-btn--table"
        onClick={(e) => {
          e.stopPropagation();
          getEmbedCode(assessment);
        }}
        onFocus={props.onFocus}
      >
        embed code
      </button>
    );
  }

  return null;
}

EmbedButton.propTypes = {
  assessment: React.PropTypes.shape({}).isRequired,
  getEmbedCode: React.PropTypes.func.isRequired,
  onFocus: React.PropTypes.func.isRequired,
  baseEmbedUrl: React.PropTypes.string.isRequired,
};
