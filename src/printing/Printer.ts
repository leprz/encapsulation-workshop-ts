export interface Printer {
  write(text: string): void;
  writeLine(line: string): void;
  writeError(message: string): void;
}
