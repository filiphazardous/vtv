import content from './content.json';

export default function render(locals) {

  const section = require('./templates/section.html');
  const data = [
    {title: "test 1", body: "test test test 1 test test ", media: "testbild.png", "media-caption": "bildtext1"},
    {title: "test 2", body: "test test test 2 test test ", media: "testbild2.png", "media-caption": "bildtext2"}]
  ;
  const content = data.map(o => section(o)).reduce((html, acc) => html + acc, '');
  const main = require('./templates/main.html');

  return main({content: content});
};
