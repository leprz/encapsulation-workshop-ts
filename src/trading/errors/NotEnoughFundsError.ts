export abstract class NotEnoughFundsError extends Error {
  override readonly name: string = 'NotEnoughFundsError';
}
