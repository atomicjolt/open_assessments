import $  from 'jquery';

import { AssessmentFormats }  from '../assessment';

import Qti  from './qti';

export default class Parser {

  static parseItem(xml) {
    return {
      title: xml.getAttribute("title"),
      xml
    };
  }

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
      let item = this.parseItem(top);
      return {
        standard: AssessmentFormats.Qti2,
        id: assessmentId,
        title: item.title, // Borrow the item's title as the assessment's title.
        item
      };
    } else if(tag_name == "assessmentSection") {
      throw "We don't handled assessmentSection tags yet";
    } else if(tag_name == "assessmentTest") {
      throw "We don't handled assessmentTest tags yet";
    }

    throw `Assessment isn't rooted with an expected tag.  Found ${top.tagname}.`;
  }
};
