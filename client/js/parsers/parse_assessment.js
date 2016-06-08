import $    from 'jquery';
import Qti1 from './qti1';
import Qti2 from './qti2';
//import EdX  from './edX'; // For now we don't need edX

export default function(settings, data){

  var xml = $(data);

  var assessmentXml   = xml.find('assessment').addBack('assessment');
  var questestinterop = xml.find('questestinterop').addBack('questestinterop');
  var sequential      = xml.find('sequential').addBack('sequential');

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