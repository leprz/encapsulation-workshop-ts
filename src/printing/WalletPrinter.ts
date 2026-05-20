import type { FormattedMoney } from '../money/FormattedMoney.ts';
import type { FormattedMoneyPrinter } from '../money/FormattedMoneyPrinter.ts';
import { ConsoleLayout } from './ConsoleLayout.ts';
import type { Printer } from './Printer.ts';

export class WalletPrinter {
  constructor(
    private readonly output: Printer,
    private readonly moneyPrinter: FormattedMoneyPrinter,
  ) {}

  render(owner: string, cash: FormattedMoney): void {
    this.output.write(ConsoleLayout.dotRowPrefix(`${owner} wallet`));
    cash.render(this.moneyPrinter);
    this.output.writeLine('');
  }
}
