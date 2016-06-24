import $  from 'jquery';

import { AssessmentFormats }  from '../assessment';

import Qti  from './qti';

export default class Parser {

  /**
   * Parses the XML document by slightly massaging the XML into a consistent
   * structure.  It can come as:
   *
   *  * a single item;
   *
   *  * a single section containing sections, items, sectionRefs, and/or
   *    itemRefs; or,
   *
   *  * a test containing one or more test-parts, which in turn contain sections
   *    and/or sectionRefs.
   *
   * Currently, this ignores the latter two cases, but represents a single item
   * with a containing section.
   */
  static parse(assessmentId, xml) {

    const top = xml.find(">")[0];
    const tag_name = top.tagName;

    if(tag_name == "assessmentItem") {
      return {
        standard: AssessmentFormats.Qti2,
        id: assessmentId,
        title: top.getAttribute("title"),
        item: top
      };
    } else if(tag_name == "assessmentSection") {
    } else if(tag_name == "assessmentTest") {
    } else {
      throw `Assessment isn't rooted with an expected tag.  Found ${top.tagname}.`;
    }

    throw "Uh-oh!";
  }
};
