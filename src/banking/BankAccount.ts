import { Money } from '../money/Money.ts';
import type { BalancePrinter } from '../printing/BalancePrinter.ts';
import type { CapitalPrinter } from '../printing/CapitalPrinter.ts';
import { Transaction } from './Transaction.ts';

const OVERDRAFT_COMMISSION_RATE = 0.05;

export class BankAccount {
  private readonly balance: Transaction[] = [];

  addIncome(amount: Money, title: string): void {
    this.balance.push(new Transaction(title, amount));
  }

  addExpense(expense: Money, title: string): void {
    this.balance.push(new Transaction(title, expense.negate()));

    if (this.getCapital().isNegative()) {
      this.balance.push(new Transaction('Overdraft commission', this.calculateCommission(expense)));
    }
  }

  private calculateCommission(expense: Money): Money {
    return expense.multiply(OVERDRAFT_COMMISSION_RATE).negate();
  }

  private getCapital(): Money {
    return Transaction.sumAmounts(this.balance);
  }

  printCapitalOn(printer: CapitalPrinter, owner: string): void {
    printer.render(owner, this.getCapital().format());
  }

  printBalanceOn(printer: BalancePrinter, title: string): void {
    printer.start(title);
    Transaction.printEachOn(this.balance, printer);
    printer.finish(this.getCapital().format());
  }
}
