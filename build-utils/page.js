"use strict";

export {mapKeysToPages};

function mapKeysToPages(content) {

  let retVal = {};
  content.items
    .filter(i => i.sys.contentType.sys.id === 'page')
    .forEach(i => {
      retVal[i.fields.key] = i.fields.filename;
    });
  return retVal;
}

