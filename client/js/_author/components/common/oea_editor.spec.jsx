import React          from 'react';
import { shallow }    from 'enzyme';
import  { OeaEditor } from './oea_editor';

describe('qbank editor', () => {
  let result, props, functionCalled, fileUploaded, blurText, uploadedFileIds;

  beforeEach(() => {
    functionCalled = false;
    fileUploaded = null;
    props = {
      onBlur: (text, fileIds) => {
        functionCalled = true;
        blurText = text;
        uploadedFileIds = fileIds;
      },
      bankId: 'bank_id',
      uploadScopeId: 'scope_id',
      uploadMedia: () => { functionCalled = true; },
      uploadedAssets: {
        new_uploaded_guid: {
          id: 'asset_id',
          assetContents: [{
            id: 'new_content_id',
            genusTypeId: 'genus_type_id',
          }],
        },
      },
      fileIds: {
        old_uploaded_guid: {
          assetContentId: 'old_content_id',
          assetId: 'asset_id',
          assetContentTypeId: 'genus_type_id',
        },
      },
      textSize: 'medium',
    };
    result = shallow(<OeaEditor {...props} />);
  });

  it('renders the tinymce wrapper', () => {
    const tinyWrapper = result.find('TinyWrapper');
    expect(tinyWrapper.length).toBe(1);
    expect(tinyWrapper.props().bankId).toBe(props.bankId);
  });

  it('sets text size correctly', () => {
    expect(result.find(`.au-c-text-input--${props.textSize}`).length).toBe(1);
  });

  describe('onBlur', () => {
    it('sets focused to false when onBlur is called', () => {
      result.instance().setState({ focused: true });
      expect(result.instance().state.focused).toBeTruthy();
      result.instance().onBlur('asdf', false);
      expect(result.instance().state.focused).toBeFalsy();
    });

    it('does not call onBlur when editor is unchanged', () => {
      expect(functionCalled).toBeFalsy();
      result.instance().onBlur('asdf', false);
      expect(functionCalled).toBeFalsy();
    });

    it('does call onBlur when editor is changed', () => {
      expect(functionCalled).toBeFalsy();
      result.instance().onBlur('asdf', true);
      expect(functionCalled).toBeTruthy();
    });

    it('replaces newly uploaded image src with AssetContent:<media_guid>', () => {
      const text = '<p><img src="/new_content_id/stream" /></p>';
      result.instance().onBlur(text, true);
      expect(blurText).toContain('AssetContent:new_uploaded_guid');
    });

    it('replaces previously uploaded image src with AssetContent:<media_guid>', () => {
      const text = '<p><img src="/old_content_id/stream" /></p>';
      result.instance().onBlur(text, true);
      expect(blurText).toContain('AssetContent:old_uploaded_guid');
    });

    it('replaces src attributes on video source tags', () => {
      const text = '<p><video><source src="/old_content_id/stream" /></video></p>';
      result.instance().onBlur(text, true);
      expect(blurText).toContain('AssetContent:old_uploaded_guid');
    });

    it('replaces src attributes on audio source tags', () => {
      const text = '<p><audio><source src="/old_content_id/stream" /></audio></p>';
      result.instance().onBlur(text, true);
      expect(blurText).toContain('AssetContent:old_uploaded_guid');
    });

    it('passes fileIds created from uploadedAssets', () => {
      result.instance().onBlur('asdf', true);
      expect(uploadedFileIds.new_uploaded_guid).toBeDefined();
      expect(uploadedFileIds.new_uploaded_guid.assetId).toBe('asset_id');
      expect(uploadedFileIds.new_uploaded_guid.assetContentId).toBe('new_content_id');
      expect(uploadedFileIds.new_uploaded_guid.assetContentTypeId).toBe('genus_type_id');
    });
  });
});
