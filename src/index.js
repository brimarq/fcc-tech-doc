import morphdom from 'morphdom';
import { default as pugToHtmlStr } from './index.pug';

import Prism from 'prismjs';
import 'prismjs/components/prism-pug.js';
import 'prismjs/components/prism-json.js';
import 'prismjs/components/prism-bash.js';
import 'prismjs/components/prism-scss.js';
import './script.js';

import 'normalize.css';
// import 'prismjs/themes/prism-dark.css';
// import 'prismjs/themes/prism-okaidia.css';
// import 'prismjs/themes/prism-solarizedlight.css'; // 1
import 'prismjs/themes/prism.css';
import './style.css';

(() => {
  let root = document.getElementById('root'); 
  let newRoot = document.createRange().createContextualFragment(
    `<div id="root">${pugToHtmlStr()}</div>`
  );
  let updatedRoot = morphdom(root, newRoot, {
    onBeforeElUpdated: (fromEl, toEl) => (
      fromEl.isEqualNode(toEl) ? false : true
    ),
    childrenOnly: true
  });
  return updatedRoot;
})();

if (Prism) Prism.highlightAll();

if (module.hot) {
  module.hot.accept(err => console.log(err));
}
