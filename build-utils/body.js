"use strict";

export function extractBodyTitle(content, pageKey, lang) {
  return content.items.filter(i => {
    return (i.sys.contentType.sys.id === 'header' && i.fields.key === pageKey && lang.match(i.fields.language));
  })
    .map(i => i.fields.title)
    .reduce((text, acc) => text + acc, '');
}