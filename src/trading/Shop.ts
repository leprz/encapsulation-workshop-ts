import { BankAccount } from '../banking/BankAccount.ts';
import { Product } from '../catalog/Product.ts';
import { Money } from '../money/Money.ts';
import type { BalancePrinter } from '../printing/BalancePrinter.ts';
import type { CapitalPrinter } from '../printing/CapitalPrinter.ts';
import type { Printer } from '../printing/Printer.ts';
import type { Buyer } from './Buyer.ts';
import { ManufacturerUnknownProductError } from './errors/ManufacturerUnknownProductError.ts';
import { ProductNotAvailableInStockError } from './errors/ProductNotAvailableInStockError.ts';
import type { Reseller } from './Reseller.ts';
import type { Supplier } from './Supplier.ts';

const RESALE_MARGIN = 0.2;

export class Shop implements Reseller {
  private readonly stock: Product[] = [];
  private readonly bankAccount: BankAccount;

  constructor(capital: Money) {
    this.bankAccount = new BankAccount();
    this.bankAccount.addIncome(capital, 'Initial capital');
  }

  sellProduct(sku: number, buyer: Buyer): void {
    const paidPrice = this.takeProductFromStockBySku(sku).sellTo(buyer);

    this.bankAccount.addIncome(paidPrice, `Sale #${sku}`);
  }

  private takeProductFromStockBySku(sku: number): Product {
    const product = Product.findProductBySku(sku, this.stock);

    if (product === undefined) {
      throw new ProductNotAvailableInStockError('Product is not available now');
    }

    Product.removeFromCollection(product, this.stock);
    return product;
  }

  resupply(sku: number, supplier: Supplier, printer: Printer): void {
    try {
      supplier.sellTo(sku, this);
    } catch (error) {
      if (error instanceof ManufacturerUnknownProductError) {
        printer.writeLine(`Product sku [${sku}] can not be resupplied in this manufacturer. `);
        return;
      }
      throw error;
    }
  }

  buyProduct(sku: number, price: Money): Money {
    this.bankAccount.addExpense(price, `Purchase #${sku}`);
    return price;
  }

  receiveStock(_sku: number, product: Product): void {
    this.stock.push(product.addPriceMargin(RESALE_MARGIN));
  }

  printCapitalOn(printer: CapitalPrinter): void {
    this.bankAccount.printCapitalOn(printer, 'Shop');
  }

  printBalanceOn(printer: BalancePrinter): void {
    this.bankAccount.printBalanceOn(printer, 'Shop balance');
  }
}
