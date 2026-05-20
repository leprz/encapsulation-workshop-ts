import type { FormattedMoneyPrinter } from '../money/FormattedMoneyPrinter.ts';
import { AnsiColor } from './AnsiColor.ts';
import { ConsoleLayout } from './ConsoleLayout.ts';
import type { Printer } from './Printer.ts';

export class ConsoleFormattedMoneyPrinter implements FormattedMoneyPrinter {
  private readonly useColor: boolean;

  constructor(private readonly output: Printer) {
    this.useColor = process.stdout.isTTY === true;
  }

  writeAmount(display: string, negative: boolean): void {
    const padded = display.padStart(ConsoleLayout.AMOUNT_WIDTH, ' ');

    if (this.useColor) {
      const color = negative ? AnsiColor.RED : AnsiColor.GREEN;
      this.output.write(color + padded + AnsiColor.RESET);
    } else {
      this.output.write(padded);
    }
  }
}
