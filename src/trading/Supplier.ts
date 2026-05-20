import type { Reseller } from './Reseller.ts';

export interface Supplier {
  sellTo(sku: number, reseller: Reseller): void;
}
