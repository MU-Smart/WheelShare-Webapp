import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from 'App.js';

const root = createRoot(
  document.body.appendChild(document.createElement('div'))
);
// See: https://daisyui.com/docs/themes/
document.getElementsByTagName('html')[0].setAttribute('data-theme', 'night');
root.render(<App />);
