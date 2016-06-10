import $    from 'jquery';
import Qti1 from './qti1';
import Qti2 from './qti2';
//import EdX  from './edX'; // For now we don't need edX

export const AssessmentFormat = {
  Qti1: "QTI1",
  Qti2: "QTI2",
  EdX: "EDX"
};

export const assessmentType = (xml) => {

  const assessmentXml   = xml.find('assessment').addBack('assessment');
  const questestinterop = xml.find('questestinterop').addBack('questestinterop'); // <questestinterop xmlns="http://www.imsglobal.org/xsd/ims_qtiasiv1p2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.imsglobal.org/xsd/ims_qtiasiv1p2 http://www.imsglobal.org/xsd/ims_qtiasiv1p2p1.xsd">
  const sequential      = xml.find('sequential').addBack('sequential');
  if(assessmentXml.length > 0 || questestinterop.length > 0){
    return AssessmentFormat.QTI1;
  } else if(false){ // figure out QTI2 condition
    return AssessmentFormat.QTI2;
  } else if(sequential.length > 0){
    return AssessmentFormat.EDX;
  } else {
    throw "Open Assessments could not find valid QTI or EdX XML. Nothing will be rendered. Please verify that your XML meets one of these standards.";
  }

};

/**
 * Determines what type of assessment has been passed and parses it correctly,
 * whatever type it is.
 */
export const parse = (settings, qtiXml) => {

  const xml             = $($.parseXML(qtiXml));
  const assessmentXml   = xml.find('assessment').addBack('assessment');
  const sequential      = xml.find('sequential').addBack('sequential');

  switch(assessmentType(xml)){
    case AssessmentFormat.Qti1:
      return Qti1.parse(settings.get("assessmentId"), assessmentXml, xml);
    case AssessmentFormat.Qti2:
      return null;
    case AssessmentFormat.EdX:
      return EdX.parse(settings, sequential);
  }

};