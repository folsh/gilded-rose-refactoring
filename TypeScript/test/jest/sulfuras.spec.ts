import { SULFURAS, afterOneDay } from './helpers';

describe('Sulfuras, Hand of Ragnaros', () => {
  // Legendary item: no ageing at all, and the documented exception to the 50
  // ceiling. One case before the sell by date and one after it cover the rule.
  it.each([
    { sellIn: 10 },
    { sellIn: -1 },
  ])('never has to be sold nor decreases in quality with sellIn $sellIn', ({ sellIn }) => {
    const item = afterOneDay(SULFURAS, sellIn, 80);

    expect(item.sellIn).toBe(sellIn);
    expect(item.quality).toBe(80);
  });
});
