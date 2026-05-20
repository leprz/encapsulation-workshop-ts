import { Wallet } from '../banking/Wallet.ts';
import { Money } from '../money/Money.ts';
import type { WalletPrinter } from '../printing/WalletPrinter.ts';
import type { Buyer } from './Buyer.ts';

export class Customer implements Buyer {
  private readonly wallet: Wallet;

  constructor(cash: Money) {
    this.wallet = new Wallet(cash);
  }

  buyProduct(_sku: number, price: Money): Money {
    return this.wallet.withdrawMoney(price);
  }

  printMoneyLeftOn(printer: WalletPrinter): void {
    this.wallet.printOn(printer, 'Customer');
  }
}
