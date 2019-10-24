import Prism from 'prismjs';
import 'normalize.css/normalize.css';
import 'prismjs/plugins/diff-highlight/prism-diff-highlight.css';
import 'prismjs/plugins/diff-highlight/prism-diff-highlight.js';

import './style.css';
import './script.js';


// Inject compiled index.pug content as HTML
(() => {
  const root = document.getElementById('root');
  return root.innerHTML = require('./index.pug')();
})();

if (Prism) Prism.highlightAll();

if (module.hot) {
  module.hot.accept(err => console.log(err));
}
