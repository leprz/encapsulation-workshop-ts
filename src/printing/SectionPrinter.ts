import { ConsoleLayout } from './ConsoleLayout.ts';
import type { Printer } from './Printer.ts';

export class SectionPrinter {
  constructor(private readonly output: Printer) {}

  print(title: string): void {
    const indent = ' '.repeat(ConsoleLayout.INDENT);
    const divider = ConsoleLayout.SECTION_DIVIDER.repeat(
      ConsoleLayout.TOTAL_WIDTH - ConsoleLayout.INDENT,
    );

    this.output.writeLine('');
    this.output.writeLine(indent + divider);
    this.output.writeLine(indent + title);
    this.output.writeLine(indent + divider);
  }
}
