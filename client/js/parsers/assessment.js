import $  from 'jquery';

import CLIx  from './clix/parser';
//import EdX  from './edX/parser'; // For now we don't need edX
import Qti1  from './qti1/parser';
import Qti2  from './qti2/parser';

export const AssessmentFormats = {
  CLIx: "CLIx",
  EdX: "EDX",
  Qti1: "QTI1",
  Qti2: "QTI2"
};

// Determines what type of assessment has been passed and parses it correctly,
// whatever type it is.
export const parse = (settings, data) => {

  const assessment_id = settings.assessment_id;

  if(data.startsWith("{")) {

    let json = JSON.parse(data);

    if(json.format == "MIT-CLIx-OEA") {
      return CLIx.parse(assessment_id, json);
    }

  } else if(data.startsWith("<?xml")) {

    // Looks like XML.  Detect based on default namespace or parsed structure.
    const xml    = $($.parseXML(data));
    const xmlns  = xml.find('>').attr('xmlns');

    if(xmlns.startsWith("http://www.imsglobal.org/xsd/imsqti_v2p")) {
      return Qti2.parse(assessment_id, xml);
    }

    // TODO: It would be nice to detect /all/ the XML formats based on
    // namespace.

    const assessmentXml   = xml.find('assessment').addBack('assessment');
    const questestinterop = xml.find('questestinterop').addBack('questestinterop'); // <questestinterop xmlns="http://www.imsglobal.org/xsd/ims_qtiasiv1p2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.imsglobal.org/xsd/ims_qtiasiv1p2 http://www.imsglobal.org/xsd/ims_qtiasiv1p2p1.xsd">
    const sequential      = xml.find('sequential').addBack('sequential');

    if(assessmentXml.length > 0 || questestinterop.length > 0){
      return Qti1.parse(assessment_id, assessmentXml, xml);
    } else if(sequential.length > 0){
      return EdX.parse(settings, sequential);
    }
  }

  throw "Open Assessments could not find valid QTI or EdX XML. Nothing will be rendered. Please verify that your XML meets one of these standards.";
};
