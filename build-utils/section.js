"use strict";

export function convertToSectionAr(content, assetData, pageKey, lang) {

  const showdown = require('showdown');
  const converter = new showdown.Converter();
  const imgBaseUri = '/img';
  return content.items
    .filter(i => i.sys.contentType.sys.id === 'section' && `/${i.fields.language}/` === lang && i.fields.key === pageKey)
    .sort((a, b) => {
      if (a.fields.order < b.fields.order) return -1;
      if (a.fields.order > b.fields.order) return 1;
      return 0;
    })
    .map(i => {
      let sectionData = {
        title: i.fields.title,
        anchor: i.fields.anchor ? `id="${i.fields.anchor}" ` : '',
        body: converter.makeHtml(i.fields.body),
        media: ``,
        mediaDescription: '',
        mediaCaption: '',
        key: i.fields.key,
        language: i.fields.language,
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