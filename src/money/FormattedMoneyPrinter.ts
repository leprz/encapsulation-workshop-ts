export interface FormattedMoneyPrinter {
  writeAmount(display: string, negative: boolean): void;
}
