"use strict";

export {mapKeysToPages};

function mapKeysToPages(content) {
  return {
    INDEX: 'index.html',
    OM_OSS: 'om_oss.html',
    'index.html': 'INDEX',
    'om_oss.html': 'OM_OSS',
  };
}

