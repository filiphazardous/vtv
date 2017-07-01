"use strict";

export function extractFooterText(content, lang) {

  const showdown = require('showdown');
  const converter = new showdown.Converter();

  return content.items.filter(i => i.sys.contentType.sys.id === 'footer' && lang.match(i.fields.language))
    .map(i => converter.makeHtml(i.fields.footer))
    .reduce((html, acc) => html + acc, '');
}