"use strict";

export function convertToSectionAr(content, lang) {
  return content.items
    .filter(i => i.sys.contentType.sys.id === 'section' && `/${i.fields.language}/` === lang)
    .map(i => {
      return {
        title: i.fields.title,
        body: i.fields.body,
        media: `${i.fields.media.sys.id}.jpg`,
        mediaCaption: i.fields.mediaCaption,
        key: i.fields.key,
        language: i.fields.language
      };
    });
}