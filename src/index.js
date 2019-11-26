import morphdom from 'morphdom';
import { default as pugToHtmlStr } from './index.pug';

// import Prism from 'prismjs';
// import 'prismjs/components/prism-pug.js';
// import 'prismjs/components/prism-json.js';
// import 'prismjs/components/prism-bash.js';
// import 'prismjs/components/prism-scss.js';
import './script.js';

// import 'normalize.css';

/** PrismJS builtin themes */
// import 'prismjs/themes/prism-dark.css';
// import 'prismjs/themes/prism-okaidia.css';
// import 'prismjs/themes/prism-twilight.css';
// import 'prismjs/themes/prism-solarizedlight.css'; // 1
// import 'prismjs/themes/prism.css';

/** prism-themes for PrismJS */
// import 'prism-themes/themes/prism-atom-dark.css';
// import 'prism-themes/themes/prism-material-dark.css'; // 1
// import 'prism-themes/themes/prism-a11y-dark.css';
// import 'prism-themes/themes/prism-dracula.css';


// import './prism-cpentwilight.css';
import './style.css';

(() => {
  let root = document.getElementById('root'); 
  let newRoot = document.createRange().createContextualFragment(pugToHtmlStr());
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
