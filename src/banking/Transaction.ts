import { Money } from '../money/Money.ts';
import type { BalancePrinter } from '../printing/BalancePrinter.ts';

export class Transaction {
  constructor(
    private readonly title: string,
    private readonly amount: Money,
  ) {}

  static sumAmounts(transactions: Transaction[]): Money {
    return transactions.reduce((carry, tx) => carry.add(tx.amount), new Money(0));
  }

  static printEachOn(transactions: Transaction[], printer: BalancePrinter): void {
    for (const tx of transactions) {
      printer.entry(tx.title, tx.amount.format());
    }
  }
}
