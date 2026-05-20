import { Money } from '../money/Money.ts';
import type { WalletPrinter } from '../printing/WalletPrinter.ts';
import { WalletNotEnoughCashError } from '../trading/errors/WalletNotEnoughCashError.ts';

export class Wallet {
  constructor(private cash: Money) {}

  withdrawMoney(amount: Money): Money {
    const afterPayment = this.cash.subtract(amount);

    if (afterPayment.isNegative()) {
      throw new WalletNotEnoughCashError('Not enough money');
    }

    this.cash = afterPayment;

    return amount;
  }

  printOn(printer: WalletPrinter, owner: string): void {
    printer.render(owner, this.cash.format());
  }
}
