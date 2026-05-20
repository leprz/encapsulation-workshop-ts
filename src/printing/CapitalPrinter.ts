import type { FormattedMoney } from '../money/FormattedMoney.ts';
import type { FormattedMoneyPrinter } from '../money/FormattedMoneyPrinter.ts';
import { ConsoleLayout } from './ConsoleLayout.ts';
import type { Printer } from './Printer.ts';

export class CapitalPrinter {
  constructor(
    private readonly output: Printer,
    private readonly moneyPrinter: FormattedMoneyPrinter,
  ) {}

  render(owner: string, capital: FormattedMoney): void {
    this.output.write(ConsoleLayout.dotRowPrefix(`${owner} capital`));
    capital.render(this.moneyPrinter);
    this.output.writeLine('');
  }
}
