"use strict";

import {mapKeysToPages} from './page';

export function convertToMenuItemAr(content, menu, lang, currentPage) {
  const keysToPages = mapKeysToPages(content);

  return content.items
    .filter(i => (i.sys.contentType.sys.id === 'menuItem' && (!lang || lang.match(new RegExp(i.fields.language))) && i.fields.menu === menu))
    .sort((a, b) => {
      if (a.fields.order < b.fields.order) return -1;
      if (a.fields.order > b.fields.order) return 1;
      return 0;
    })
    .map(i => {
      let pageMatch = i.fields.link.match(currentPage);
      return {
        current: (pageMatch && pageMatch.length > 0) ? 'current' : '',
        callout: i.fields.callout ? 'callout' : '',
        link: i.fields.link,
        name: i.fields.label,
      };
    });

}