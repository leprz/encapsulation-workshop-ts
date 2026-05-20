import { FormattedMoney } from './FormattedMoney.ts';

const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export class Money {
  constructor(private readonly amount: number) {}

  subtract(other: Money): Money {
    return new Money(this.amount - other.amount);
  }

  add(other: Money): Money {
    return new Money(this.amount + other.amount);
  }

  negate(): Money {
    return new Money(-this.amount);
  }

  multiply(multiplier: number): Money {
    return new Money(Math.round(this.amount * multiplier * 100) / 100);
  }

  isNegative(): boolean {
    return this.amount < 0;
  }

  equals(other: Money): boolean {
    return this.amount === other.amount;
  }

  format(): FormattedMoney {
    const display = '$' + CURRENCY_FORMATTER.format(Math.abs(this.amount));
    return new FormattedMoney(
      this.isNegative() ? '-' + display : display,
      this.isNegative(),
    );
  }

  toString(): string {
    return (this.isNegative() ? '-$' : '$') + CURRENCY_FORMATTER.format(Math.abs(this.amount));
  }
}
