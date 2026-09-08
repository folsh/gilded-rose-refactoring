import { NORMAL, afterOneDay } from './helpers';

describe('A normal item', () => {
  it('lowers both sellIn and quality by one at the end of the day', () => {
    const item = afterOneDay(NORMAL, 10, 20);

    expect(item.name).toBe(NORMAL);
    expect(item.sellIn).toBe(9);
    expect(item.quality).toBe(19);
  });

  // A normal item has a single threshold: the day its sell by date passes.
  // The pair below is what tells `sellIn < 0` from `sellIn <= 0`.
  describe('around the sell by date', () => {
    it('still degrades by one on the last day before the sell by date', () => {
      const item = afterOneDay(NORMAL, 1, 20);

      expect(item.sellIn).toBe(0);
      expect(item.quality).toBe(19);
    });

    it('degrades twice as fast on the day the sell by date passes', () => {
      const item = afterOneDay(NORMAL, 0, 20);

      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(18);
    });

    it('keeps degrading twice as fast on an already expired item', () => {
      const item = afterOneDay(NORMAL, -1, 20);

      expect(item.sellIn).toBe(-2);
      expect(item.quality).toBe(18);
    });
  });

  describe('quality never goes negative', () => {
    it.each([
      { sellIn: 5, quality: 1, reason: 'lands exactly on the floor' },
      { sellIn: 5, quality: 0, reason: 'is already on the floor' },
      { sellIn: 0, quality: 2, reason: 'lands exactly on the floor at the expired rate' },
      { sellIn: 0, quality: 1, reason: 'is clamped mid step, the expired rate would overshoot' },
      { sellIn: 0, quality: 0, reason: 'is already on the floor once expired' },
    ])('quality $quality with sellIn $sellIn $reason', ({ sellIn, quality }) => {
      expect(afterOneDay(NORMAL, sellIn, quality).quality).toBe(0);
    });
  });
});
