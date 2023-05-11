import { registerPlugin } from '@capacitor/core';

import { ClearSalePlugin } from './definitions';

const ClearSalePlugin = registerPlugin<ClearSalePlugin>(
  'ClearSalePlugin',
  {
    web: () => import('./web').then(m => new m.ClearSalePluginWeb()),
  },
);

export * from './definitions';
export { ClearSalePlugin };
