export interface ClearSalePluginPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
