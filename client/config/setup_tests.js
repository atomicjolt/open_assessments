import 'jasmine-ajax';
import 'jasmine-jquery';
import xmlserializer  from 'xmlserializer';

jest.mock('../js/libs/assets');
global.XMLSerializer = class ParserMock {
  serializeToString(doc) { // eslint-disable-line class-methods-use-this
    return xmlserializer.serializeToString(doc);
  }
};
