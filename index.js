"use strict";

/* Utils */
import {convertToSectionAr} from './build-utils/section';
import {dump} from './build-utils/debug';

/* Templates */
import main from './src/templates/main.html';
import section from './src/templates/section.html';

/* Pre-downloaded content */
import content from './content.json';
import assetData from './assetData.json';

export default function render(locals) {

  const data = convertToSectionAr(content, assetData, locals.path);
  const processedContent = data.map(o => section(o)).reduce((html, acc) => html + acc, '');

  return main({content: processedContent, inlineCss: require('./src/styles/main.less')});
};
