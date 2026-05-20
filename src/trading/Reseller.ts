import type { Product } from '../catalog/Product.ts';
import type { Buyer } from './Buyer.ts';

export interface Reseller extends Buyer {
  receiveStock(sku: number, product: Product): void;
}
