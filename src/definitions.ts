export interface ClearSalePlugin {
  liveness(options: { keyCS: string }): Promise<void>;
}
