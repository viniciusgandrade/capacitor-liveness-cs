import { WebPlugin } from '@capacitor/core';

import type { ClearSalePlugin } from './definitions';

export class ClearSalePluginWeb
  extends WebPlugin
  implements ClearSalePlugin {
  async liveness(options: { keyCS: string }): Promise<void> {
    console.log(options);
    return new Promise(resolve => resolve());
  }
}
