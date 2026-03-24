import * as view1 from './views/view1.js';
import * as view2 from './views/view2.js';
import * as view3 from './views/view3.js';
import * as view4 from './views/view4.js';
import * as view5 from './views/view5.js';
import * as view6 from './views/view6.js';
import * as view7 from './views/view7.js';
import * as view8 from './views/view8.js';
import * as view9 from './views/view9.js';

const views = { view1, view2, view3, view4, view5, view6, view7, view8, view9 };

export function navigate(viewName) {
  const view = views[viewName] ?? views['view1'];
  document.getElementById('app').innerHTML = view.render();
  view.attach();
}
