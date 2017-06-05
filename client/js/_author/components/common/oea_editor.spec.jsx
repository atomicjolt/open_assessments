import React          from 'react';
import { shallow }    from 'enzyme';
import  { OeaEditor } from './oea_editor';
import { languages } from '../../../constants/language_types';

describe('qbank editor', () => {
  let result;
  let props;
  let functionCalled;
  let blurText;
  let uploadedFileIds;

  beforeEach(() => {
    functionCalled = false;
    props = {
      onBlur: (text, fileIds) => {
        functionCalled = true;
        blurText = text;
        uploadedFileIds = fileIds;
      },
      bankId: 'bank_id',
      uploadMedia: () => { functionCalled = true; },
      uploadedAssets: {
        new_uploaded_guid: {
          id: 'asset_id',
          type: 'image',
          extension: 'jpg',
          assetContentId: 'new_content_id',
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
      language: languages.languageTypeId.english
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
      const text = '<p><img src="/base/specs_support/fixtures/new_content_id/stream" /></p>';
      result.instance().onBlur(text, true);
      expect(blurText).toContain('AssetContent:new_uploaded_guid');
    });

    it('replaces previously uploaded image src with AssetContent:<media_guid>', () => {
      const text = '<p><img src="/base/specs_support/fixtures/old_content_id/stream" /></p>';
      result.instance().onBlur(text, true);
      expect(blurText).toContain('AssetContent:old_uploaded_guid');
    });

    it('replaces src attributes on video source tags', () => {
      const text = '<p><video><source src="/base/specs_support/fixtures/old_content_id/stream" /></video></p>';
      result.instance().onBlur(text, true);
      expect(blurText).toContain('AssetContent:old_uploaded_guid');
    });

    it('replaces src attributes on audio source tags', () => {
      const text = '<p><audio><source src="/base/specs_support/fixtures/old_content_id/stream" /></audio></p>';
      result.instance().onBlur(text, true);
      expect(blurText).toContain('AssetContent:old_uploaded_guid');
    });

    it('passes fileIds created from uploadedAssets', () => {
      result.instance().setState({ fileGuids: { new_uploaded_guid: {} } });
      result.instance().onBlur('asdf', true);
      expect(uploadedFileIds.new_uploaded_guid).toBeDefined();
      expect(uploadedFileIds.new_uploaded_guid.assetId).toBe('asset_id');
      expect(uploadedFileIds.new_uploaded_guid.assetContentId).toBe('new_content_id');
      expect(uploadedFileIds.new_uploaded_guid.assetContentTypeId).toBe('asset-content-genus-type%3Ajpg%40iana.org');
    });
  });

  describe('insert media', () => {
    let insertText;
    let insertContentCalled;
    let file;

    beforeEach(() => {
      insertContentCalled = false;
      result.instance().setState({
        editor: {
          insertContent: (text) => {
            insertContentCalled = true;
            insertText = text;
          }
        }
      });
    });

    it('does not insert anything if mediaUrl is falsey', () => {
      expect(insertContentCalled).toBeFalsy();
      result.instance().insertMedia(undefined);
      expect(insertContentCalled).toBeFalsy();
    });

    describe('from already existing assets', () => {
      beforeEach(() => {
        file = {
          altText: { text: 'alt-text' },
          altTexts: [{
            languageTypeId: languages.languageTypeId.english,
            text: 'alt-text'
          }],
          id: 'id',
          type: 'image',
          extension: 'jpg',
          url: 'http://example.com/image',
        };
      });

      it('inserts an img tag if state.mediaType is img', () => {
        result.instance().setState({ mediaType: 'img' });
        expect(insertContentCalled).toBeFalsy();
        result.instance().insertMedia(file);
        expect(insertContentCalled).toBeTruthy();
        expect(insertText).toContain('<img src="http://example.com/image" alt="alt-text">');
      });

      it('inserts a video tag if state.mediaType is video', () => {
        result.instance().setState({ mediaType: 'video' });
        expect(insertContentCalled).toBeFalsy();
        result.instance().insertMedia(file);
        expect(insertContentCalled).toBeTruthy();
        expect(insertText).toContain('<video');
        expect(insertText).toContain('controls');
        expect(insertText).toContain(`class="${OeaEditor.VIDEO_CLASSES}"`);
        expect(insertText).toContain('src="http://example.com/image"');
        expect(insertText).toContain('type="video/jpg">');
        expect(insertText).toContain('</video>');
      });

      it('inserts an audio tag if state.mediaType is audio', () => {
        result.instance().setState({ mediaType: 'audio' });
        expect(insertContentCalled).toBeFalsy();
        result.instance().insertMedia(file);
        expect(insertContentCalled).toBeTruthy();
        expect(insertText).toContain('<audio');
        expect(insertText).toContain('class="span_12_of_12"');
        expect(insertText).toContain('controls');
        expect(insertText).toContain('src="http://example.com/image"');
        expect(insertText).toContain('type="audio/jpg">');
        expect(insertText).toContain('</audio>');
      });
    });

    describe('from newly uploaded assets', () => {
      const metaData = {
        altText: 'alt-text',
        description: 'description',
        license: 'license',
        copyright: 'copyright',
      };

      it('calls uploadMedia', () => {
        result.instance().insertMedia(file, metaData, true);
        expect(functionCalled).toBeTruthy();
      });
    });
  });
});
