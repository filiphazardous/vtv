"use strict";

/* Utils */
import {convertToSectionAr} from './build-utils/section';

/* Templates */
import main from './templates/main.html';
import section from './templates/section.html';

/* Pre-downloaded content */
import content from './content.json';

export default function render(locals) {

  const data = convertToSectionAr(content, locals.path);
  const processedContent = data.map(o => section(o)).reduce((html, acc) => html + acc, '');

  return main({content: processedContent});
};
