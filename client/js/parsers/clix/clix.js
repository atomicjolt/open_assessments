import { transformItem as transformQti2 }  from "../qti2/qti";


export function transformItem(item) {
  var qti = transformQti2(item.xml);
  return Object.assign(qti, {
    title: item.title,
    isHtml: true
  });
};
