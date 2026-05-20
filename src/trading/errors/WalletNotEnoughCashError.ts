import { NotEnoughFundsError } from './NotEnoughFundsError.ts';

export class WalletNotEnoughCashError extends NotEnoughFundsError {
  override readonly name = 'WalletNotEnoughCashError';
}
