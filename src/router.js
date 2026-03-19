import * as view1 from './views/view1.js';
import * as view2 from './views/view2.js';
import * as view3 from './views/view3.js';

const views = { view1, view2, view3 };

export function navigate(viewName) {
  const view = views[viewName] ?? views['view1'];
  document.getElementById('app').innerHTML = view.render();
  view.attach();
}
