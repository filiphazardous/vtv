"use strict";

/* Utils */
import {mapKeysToPages} from './build-utils/page';
import {convertToMenuItemAr} from './build-utils/menu';
import {extractBodyTitle} from './build-utils/body';
import {convertToSectionAr} from './build-utils/section';
import {extractFooterText} from './build-utils/footer';
//import {dump} from './build-utils/debug';

/* Templates */
import page from './src/templates/page.html';
import head from './src/templates/head.html';
import body from './src/templates/body.html';
import header from './src/templates/header.html';
import bodyTitle from './src/templates/body-title.html';
import menuLanguage from './src/templates/menu-language.html'
import menuLanguageItem from './src/templates/menu-language-item.html'
import menuMain from './src/templates/menu-main.html';
import menuMainItem from './src/templates/menu-main-item.html';
import main from './src/templates/main.html';
import section from './src/templates/section.html';
import footer from './src/templates/footer.html';


/* Pre-downloaded content */
import content from './content.json';
import assetData from './assetData.json';

export default function render(locals) {

  const keysToPages = mapKeysToPages(content);
  let retVals = {};
  ['INDEX', 'OM_OSS'].forEach((pageKey) => {

    const menuLanguageData = convertToMenuItemAr(content, 'LANGUAGE', null, locals.path);
    const menuMainData = convertToMenuItemAr(content, 'MAIN', locals.path, keysToPages[pageKey]);
    const sectionData = convertToSectionAr(content, assetData, pageKey, locals.path);

    // Parts for menus
    const processedMenuLanguageItems = menuLanguageData.map(i => menuLanguageItem(i)).reduce((html, acc) => html + acc, '');
    const processedMenuMainItems = menuMainData.map(i => menuMainItem(i)).reduce((html, acc) => html + acc, '');

    // Parts for header
    const processedMenuLanguage = menuLanguage({menuItems: processedMenuLanguageItems});
    const processedMenuMain = menuMain({menuItems: processedMenuMainItems});

    // Parts for main
    const processedBodyTitle = bodyTitle({title: extractBodyTitle(content, pageKey, locals.path)});
    const processedSections = sectionData.map(o => section(o)).reduce((html, acc) => html + acc, '');

    // Parts for body
    const processedHeader = header({menuLanguage: processedMenuLanguage, menuMain: processedMenuMain,});
    const processedMain = main({title: processedBodyTitle, sections: processedSections});
    const processedFooter = footer({footer: extractFooterText(content, locals.path)});

    // Parts for page
    const processedHead = head({inlineCss: require('./src/styles/main.less')});
    const processedBody = body({
      header: processedHeader,
      main: processedMain,
      footer: processedFooter,
    });
    retVals[locals.path + keysToPages[pageKey]] = page({head: processedHead, body: processedBody});
  });

  return retVals;
};


