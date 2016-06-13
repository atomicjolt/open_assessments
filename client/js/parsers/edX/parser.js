import EdX                from './edx';
import EdXSection         from './edx_section';
import EdXItem            from './edx_item';
//import AssessmentActions  from "../actions/assessment"; // TODO get rid of this and have edX load it's own data

export default class Assessment{

  static parseEdX(settings, sequential){
    var url = settings.srcUrl;
    var id  = url.slice(url.indexOf('sequential')).replace('.xml', '');
    var assessment = {
      id       : id,
      title    : sequential.attr('display_name'),
      standard : 'edX'
    };

    // Add ids for the sections before returning the assessment so that we can order them
    assessment.sections = EdX.idPlaceholders(
      EdX.ensureIds('edx_sequential_', sequential.children()) // Ensure every child has an id
    );

    var baseUrl = url.substr(0, url.indexOf('sequential'));
    EdX.crawlEdX(sequential.children(), baseUrl + 'vertical/', settings, function(id, url, res){
      var section = EdXSection.fromEdX(id, url, res);
      var children = section.xml.children();
      section.items = EdX.idPlaceholders(
        EdX.ensureIds('edx_item_', children) // Ensure every child has an id
      );
      AssessmentActions.edXLoadSection(section);
      EdX.crawlEdX(children, baseUrl + 'problem/', settings, function(id, url, res){
        var item = EdXItem.fromEdX(id, url, res);
        AssessmentActions.edXLoadItem(item);
      }.bind(this));

    }.bind(this));
    return assessment;
  }

}
