import { Money } from './src/money/Money.ts';
import { BalancePrinter } from './src/printing/BalancePrinter.ts';
import { CapitalPrinter } from './src/printing/CapitalPrinter.ts';
import { ConsoleFormattedMoneyPrinter } from './src/printing/ConsoleFormattedMoneyPrinter.ts';
import { ConsolePrinter } from './src/printing/ConsolePrinter.ts';
import { SectionPrinter } from './src/printing/SectionPrinter.ts';
import { WalletPrinter } from './src/printing/WalletPrinter.ts';
import { Customer } from './src/trading/Customer.ts';
import { NotEnoughFundsError } from './src/trading/errors/NotEnoughFundsError.ts';
import { ProductNotAvailableInStockError } from './src/trading/errors/ProductNotAvailableInStockError.ts';
import { Manufacturer } from './src/trading/Manufacturer.ts';
import { Shop } from './src/trading/Shop.ts';

const output = new ConsolePrinter();
const moneyPrinter = new ConsoleFormattedMoneyPrinter(output);
const capitalPrinter = new CapitalPrinter(output, moneyPrinter);
const walletPrinter = new WalletPrinter(output, moneyPrinter);
const balancePrinter = new BalancePrinter(output, moneyPrinter);
const sectionPrinter = new SectionPrinter(output);

const manufacturer = new Manufacturer();
const shop = new Shop(new Money(0));
const johnDoe = new Customer(new Money(300));

try {
  shop.resupply(1, manufacturer, output);
  shop.sellProduct(1, johnDoe);

  shop.resupply(1, manufacturer, output);
  shop.resupply(2, manufacturer, output);
  shop.resupply(2, manufacturer, output);
  shop.resupply(2, manufacturer, output);
  shop.resupply(2, manufacturer, output);
  shop.sellProduct(1, johnDoe);
  shop.sellProduct(2, johnDoe);
  shop.sellProduct(2, johnDoe);
  shop.sellProduct(2, johnDoe);
  shop.sellProduct(2, johnDoe);
} catch (error) {
  if (error instanceof NotEnoughFundsError || error instanceof ProductNotAvailableInStockError) {
    output.writeError(error.message);
    process.exit(1);
  }
  throw error;
}

sectionPrinter.print('Capital Summary');
manufacturer.printCapitalOn(capitalPrinter);
shop.printCapitalOn(capitalPrinter);
johnDoe.printMoneyLeftOn(walletPrinter);
shop.printBalanceOn(balancePrinter);
