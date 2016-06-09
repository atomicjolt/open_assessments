import $    from 'jquery';
import Qti1 from './qti1';
import Qti2 from './qti2';
//import EdX  from './edX'; // For now we don't need edX

export default function(settings, qtiXml){

  const xml             = $($.parseXML(qtiXml));
  const assessmentXml   = xml.find('assessment').addBack('assessment');
  const questestinterop = xml.find('questestinterop').addBack('questestinterop'); // <questestinterop xmlns="http://www.imsglobal.org/xsd/ims_qtiasiv1p2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.imsglobal.org/xsd/ims_qtiasiv1p2 http://www.imsglobal.org/xsd/ims_qtiasiv1p2p1.xsd">
  const sequential      = xml.find('sequential').addBack('sequential');

  if(assessmentXml.length > 0 || questestinterop.length > 0){
    return Qti1.parse(settings.assessmentId, assessmentXml, xml);
  } else if(sequential.length > 0){
    //return EdX.parse(settings, sequential);
  } else{
    return {
      error: "Open Assessments could not find valid QTI or EdX XML. Nothing will be rendered. Please verify that your XML meets one of these standards."
    };
  }

}