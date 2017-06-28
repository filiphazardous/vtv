"use strict";

export function convertToSectionAr(content, lang) {
  const showdown = require('showdown');
  const converter = new showdown.Converter();
  return content.items
    .filter(i => i.sys.contentType.sys.id === 'section' && `/${i.fields.language}/` === lang)
    .map(i => {
      return {
        title: i.fields.title,
        body: converter.makeHtml(i.fields.body),
        media: `${i.fields.media.sys.id}.jpg`,
        mediaCaption: i.fields.mediaCaption,
        key: i.fields.key,
        language: i.fields.language
      };
    });
}