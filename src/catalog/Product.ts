import type { Money } from '../money/Money.ts';
import type { Buyer } from '../trading/Buyer.ts';

export class Product {
  constructor(
    private readonly sku: number,
    private readonly price: Money,
  ) {}

  sellTo(buyer: Buyer): Money {
    return buyer.buyProduct(this.sku, this.price);
  }

  addPriceMargin(margin: number): Product {
    return new Product(this.sku, this.price.multiply(1 + margin));
  }

  static findProductBySku(sku: number, products: Product[]): Product | undefined {
    return products.find((product) => product.sku === sku);
  }

  static removeFromCollection(product: Product, products: Product[]): void {
    const index = products.indexOf(product);
    if (index !== -1) {
      products.splice(index, 1);
    }
  }
}
