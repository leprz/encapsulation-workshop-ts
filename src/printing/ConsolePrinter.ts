import { AnsiColor } from './AnsiColor.ts';
import type { Printer } from './Printer.ts';

export class ConsolePrinter implements Printer {
  write(text: string): void {
    process.stdout.write(text);
  }

  writeLine(line: string): void {
    process.stdout.write(line + '\n');
  }

  writeError(message: string): void {
    process.stderr.write(
      '\n' + AnsiColor.BOLD_RED + '  ✖ Error:' + AnsiColor.RED + ' ' + message + AnsiColor.RESET + '\n\n',
    );
  }
}
