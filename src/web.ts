import { WebPlugin } from '@capacitor/core';

import type { ClearSalePluginPlugin } from './definitions';

export class ClearSalePluginWeb
  extends WebPlugin
  implements ClearSalePluginPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
