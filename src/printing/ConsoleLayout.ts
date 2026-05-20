export const ConsoleLayout = {
  TOTAL_WIDTH: 50,
  AMOUNT_WIDTH: 10,
  INDENT: 2,
  DIVIDER: '─',
  SECTION_DIVIDER: '═',

  dotRowPrefix(label: string): string {
    const dotsLen =
      this.TOTAL_WIDTH - this.INDENT - [...label].length - 2 - this.AMOUNT_WIDTH;

    return (
      ' '.repeat(this.INDENT) +
      label +
      ' ' +
      '.'.repeat(Math.max(1, dotsLen)) +
      ' '
    );
  },
} as const;
