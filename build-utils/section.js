"use strict";

export function convertToSectionAr(content, assetData, lang) {
  const showdown = require('showdown');
  const converter = new showdown.Converter();
  const imgBaseUri = '/img';
  return content.items
    .filter(i => i.sys.contentType.sys.id === 'section' && `/${i.fields.language}/` === lang)
    .map(i => {
      let sectionData = {
        title: i.fields.title,
        body: converter.makeHtml(i.fields.body),
        media: ``,
        mediaDescription: '',
        mediaCaption: '',
        key: i.fields.key,
        language: i.fields.language
      };

      if (i.fields.media && i.fields.media.sys.id) {
        const itemAsset = assetData[i.fields.media.sys.id];
        sectionData.media = `${imgBaseUri}/${itemAsset.file.fileName}`;
        sectionData.mediaDescription = itemAsset.description;
        sectionData.mediaCaption = i.fields.mediaCaption;
      }

      return sectionData;
    });
}