import type { Money } from '../money/Money.ts';

export interface Buyer {
  buyProduct(sku: number, price: Money): Money;
}
