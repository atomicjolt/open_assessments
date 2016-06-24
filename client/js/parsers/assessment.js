import $  from 'jquery';

import Qti1  from './qti1/parser';
import Qti2  from './qti2/parser';
//import EdX  from './edX/parser'; // For now we don't need edX

export const AssessmentFormats = {
  Qti1: "QTI1",
  Qti2: "QTI2",
  EdX: "EDX"
};

// Determines what type of assessment has been passed and parses it correctly,
// whatever type it is.
export const parse = (settings, data) => {

  const xml    = $($.parseXML(data));
  const xmlns  = xml.find('>').attr('xmlns');

  if(xmlns.startsWith("http://www.imsglobal.org/xsd/imsqti_v2p")) {
    return Qti2.parse(settings.get("assessmentId"), xml);
  }

  const assessmentXml   = xml.find('assessment').addBack('assessment');
  const questestinterop = xml.find('questestinterop').addBack('questestinterop'); // <questestinterop xmlns="http://www.imsglobal.org/xsd/ims_qtiasiv1p2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.imsglobal.org/xsd/ims_qtiasiv1p2 http://www.imsglobal.org/xsd/ims_qtiasiv1p2p1.xsd">
  const sequential      = xml.find('sequential').addBack('sequential');

  if(assessmentXml.length > 0 || questestinterop.length > 0){
    return Qti1.parse(settings.get("assessmentId"), assessmentXml, xml);
  } else if(sequential.length > 0){
    return EdX.parse(settings, sequential);
  }

  throw "Open Assessments could not find valid QTI or EdX XML. Nothing will be rendered. Please verify that your XML meets one of these standards.";
};




// TODO have to figure out how to handle assessment parsing. We could just
// Store the raw data in the state and let the selectors figure out the real details
// by parsing the data on demand.
// OR we can let the load_assessment middlware use whatever parser it needs to use and then store
// the resulting object in the state in that form - even if the assessment objects are dramatically different
// Then we leave it up to the selectors to pull the data out as needed.
