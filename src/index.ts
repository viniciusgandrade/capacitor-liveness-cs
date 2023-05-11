import { registerPlugin } from '@capacitor/core';

import type { ClearSalePluginPlugin } from './definitions';

const ClearSalePlugin = registerPlugin<ClearSalePluginPlugin>(
  'ClearSalePlugin',
  {
    web: () => import('./web').then(m => new m.ClearSalePluginWeb()),
  },
);

export * from './definitions';
export { ClearSalePlugin };
