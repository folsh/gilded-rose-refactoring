import { AGED_BRIE, afterOneDay } from './helpers';

describe('Aged Brie', () => {
  it('increases in quality the older it gets', () => {
    const item = afterOneDay(AGED_BRIE, 10, 20);

    expect(item.sellIn).toBe(9);
    expect(item.quality).toBe(21);
  });

  // Like a normal item, Brie only changes pace when its sell by date passes:
  // it has none of the Backstage thresholds, so the pair below is the whole rule.
  describe('around the sell by date', () => {
    it('still increases by one on the last day before the sell by date', () => {
      const item = afterOneDay(AGED_BRIE, 1, 20);

      expect(item.sellIn).toBe(0);
      expect(item.quality).toBe(21);
    });

    it('increases twice as fast on the day the sell by date passes', () => {
      const item = afterOneDay(AGED_BRIE, 0, 20);

      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(22);
    });

    it('keeps increasing twice as fast on an already expired item', () => {
      const item = afterOneDay(AGED_BRIE, -1, 20);

      expect(item.sellIn).toBe(-2);
      expect(item.quality).toBe(22);
    });
  });

  describe('quality never exceeds 50', () => {
    it.each([
      { sellIn: 10, quality: 49, reason: 'lands exactly on the ceiling' },
      { sellIn: 10, quality: 50, reason: 'is already on the ceiling' },
      { sellIn: 0, quality: 48, reason: 'lands exactly on the ceiling at the expired rate' },
      { sellIn: 0, quality: 49, reason: 'is clamped mid step, the expired rate would overshoot' },
      { sellIn: 0, quality: 50, reason: 'is already on the ceiling once expired' },
    ])('quality $quality with sellIn $sellIn $reason', ({ sellIn, quality }) => {
      expect(afterOneDay(AGED_BRIE, sellIn, quality).quality).toBe(50);
    });
  });
});
