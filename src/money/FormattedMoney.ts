import type { FormattedMoneyPrinter } from './FormattedMoneyPrinter.ts';

export class FormattedMoney {
  constructor(
    private readonly display: string,
    private readonly negative: boolean,
  ) {}

  render(printer: FormattedMoneyPrinter): void {
    printer.writeAmount(this.display, this.negative);
  }
}
