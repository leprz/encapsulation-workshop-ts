import { BankAccount } from '../banking/BankAccount.ts';
import { Product } from '../catalog/Product.ts';
import { Money } from '../money/Money.ts';
import type { CapitalPrinter } from '../printing/CapitalPrinter.ts';
import { ManufacturerUnknownProductError } from './errors/ManufacturerUnknownProductError.ts';
import type { Reseller } from './Reseller.ts';
import type { Supplier } from './Supplier.ts';

interface CatalogEntry {
  readonly price: number;
  readonly cost: number;
}

const CATALOG: ReadonlyMap<number, CatalogEntry> = new Map([
  [1, { price: 10, cost: 8 }],
  [2, { price: 20, cost: 15 }],
  [3, { price: 30, cost: 22 }],
]);

export class Manufacturer implements Supplier {
  private readonly products: Product[] = [];
  private readonly productionCosts = new Map<number, Money>();
  private readonly bankAccount = new BankAccount();

  constructor() {
    for (const [sku, entry] of CATALOG) {
      this.products.push(new Product(sku, new Money(entry.price)));
      this.productionCosts.set(sku, new Money(entry.cost));
    }
  }

  sellTo(sku: number, reseller: Reseller): void {
    const product = this.makeNewProduct(sku);
    const income = product.sellTo(reseller);
    reseller.receiveStock(sku, product);
    this.bankAccount.addIncome(income, `Sale #${sku}`);
  }

  private makeNewProduct(sku: number): Product {
    const product = Product.findProductBySku(sku, this.products);
    const cost = this.productionCosts.get(sku);

    if (product === undefined || cost === undefined) {
      throw new ManufacturerUnknownProductError(
        `Unknown product with sku ${sku} can not be produced`,
      );
    }

    this.bankAccount.addExpense(cost, `Production #${sku}`);

    return product;
  }

  printCapitalOn(printer: CapitalPrinter): void {
    this.bankAccount.printCapitalOn(printer, 'Manufacturer');
  }
}
