import type { FormattedMoney } from '../money/FormattedMoney.ts';
import type { FormattedMoneyPrinter } from '../money/FormattedMoneyPrinter.ts';
import { ConsoleLayout } from './ConsoleLayout.ts';
import type { Printer } from './Printer.ts';

const TOTAL_LABEL = 'Total';

export class BalancePrinter {
  constructor(
    private readonly output: Printer,
    private readonly moneyPrinter: FormattedMoneyPrinter,
  ) {}

  start(title: string): void {
    const indent = ' '.repeat(ConsoleLayout.INDENT);
    this.output.writeLine('');
    this.output.writeLine(indent + title);
    this.output.writeLine(
      indent + ConsoleLayout.DIVIDER.repeat(ConsoleLayout.TOTAL_WIDTH - ConsoleLayout.INDENT),
    );
  }

  entry(title: string, tx: FormattedMoney): void {
    this.output.write(ConsoleLayout.dotRowPrefix(title));
    tx.render(this.moneyPrinter);
    this.output.writeLine('');
  }

  finish(total: FormattedMoney): void {
    const indent = ' '.repeat(ConsoleLayout.INDENT);
    this.output.writeLine(
      indent + ConsoleLayout.DIVIDER.repeat(ConsoleLayout.TOTAL_WIDTH - ConsoleLayout.INDENT),
    );

    const gap =
      ConsoleLayout.TOTAL_WIDTH -
      ConsoleLayout.INDENT -
      [...TOTAL_LABEL].length -
      ConsoleLayout.AMOUNT_WIDTH;
    this.output.write(indent + TOTAL_LABEL + ' '.repeat(gap));
    total.render(this.moneyPrinter);
    this.output.writeLine('');
  }
}
