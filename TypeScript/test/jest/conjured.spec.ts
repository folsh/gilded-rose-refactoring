import { CONJURED, afterOneDay } from './helpers';

describe('Conjured items', () => {
  it('degrades in quality twice as fast as a normal item', () => {
    const item = afterOneDay(CONJURED, 10, 20);

    expect(item.sellIn).toBe(9);
    expect(item.quality).toBe(18);
  });

  // Same single threshold as a normal item, only the rate differs.
  describe('around the sell by date', () => {
    it('still degrades by two on the last day before the sell by date', () => {
      const item = afterOneDay(CONJURED, 1, 20);

      expect(item.sellIn).toBe(0);
      expect(item.quality).toBe(18);
    });

    it('degrades twice as fast as an expired normal item on the day it expires', () => {
      const item = afterOneDay(CONJURED, 0, 20);

      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(16);
    });

    it('keeps degrading twice as fast on an already expired item', () => {
      const item = afterOneDay(CONJURED, -1, 20);

      expect(item.sellIn).toBe(-2);
      expect(item.quality).toBe(16);
    });
  });

  describe('quality never goes negative', () => {
    // The doubled rate makes the floor easier to overshoot: quality 1 before the
    // sell by date and quality 3 after it are the values a naive subtraction breaks on.
    it.each([
      { sellIn: 5, quality: 2, reason: 'lands exactly on the floor' },
      { sellIn: 5, quality: 1, reason: 'is clamped mid step, -2 would overshoot' },
      { sellIn: 5, quality: 0, reason: 'is already on the floor' },
      { sellIn: 0, quality: 4, reason: 'lands exactly on the floor at the expired rate' },
      { sellIn: 0, quality: 3, reason: 'is clamped mid step, -4 would overshoot' },
      { sellIn: 0, quality: 0, reason: 'is already on the floor once expired' },
    ])('quality $quality with sellIn $sellIn $reason', ({ sellIn, quality }) => {
      expect(afterOneDay(CONJURED, sellIn, quality).quality).toBe(0);
    });
  });
});
