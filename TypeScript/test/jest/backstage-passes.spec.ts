import { BACKSTAGE, afterOneDay } from './helpers';

describe('Backstage passes', () => {
  it('increases in quality as the concert approaches', () => {
    const item = afterOneDay(BACKSTAGE, 20, 20);

    expect(item.sellIn).toBe(19);
    expect(item.quality).toBe(21);
  });

  // The only item with intermediate thresholds, so each one is tested with the
  // value just before and just after the boundary.
  describe('threshold transitions', () => {
    it.each([
      { sellIn: 11, gain: 1 },
      { sellIn: 10, gain: 2 },
      { sellIn: 6, gain: 2 },
      { sellIn: 5, gain: 3 },
      { sellIn: 1, gain: 3 },
    ])('gains $gain quality at sellIn $sellIn', ({ sellIn, gain }) => {
      const item = afterOneDay(BACKSTAGE, sellIn, 20);

      expect(item.sellIn).toBe(sellIn - 1);
      expect(item.quality).toBe(20 + gain);
    });
  });

  describe('after the concert', () => {
    it('drops quality to 0 on the day the concert passes', () => {
      const item = afterOneDay(BACKSTAGE, 0, 20);

      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(0);
    });

    it('keeps quality at 0 for an already expired pass', () => {
      const item = afterOneDay(BACKSTAGE, -1, 20);

      expect(item.sellIn).toBe(-2);
      expect(item.quality).toBe(0);
    });

    it('makes even a pass worth the maximum worthless', () => {
      expect(afterOneDay(BACKSTAGE, 0, 50).quality).toBe(0);
    });
  });

  describe('quality never exceeds 50', () => {
    // One case per rate: each of the three gains must be clamped by the ceiling.
    it.each([
      { sellIn: 11, quality: 50, reason: 'is already on the ceiling at +1' },
      { sellIn: 10, quality: 49, reason: 'is clamped mid step, +2 would overshoot' },
      { sellIn: 5, quality: 48, reason: 'is clamped mid step, +3 would overshoot' },
      { sellIn: 5, quality: 50, reason: 'is already on the ceiling at +3' },
    ])('quality $quality with sellIn $sellIn $reason', ({ sellIn, quality }) => {
      expect(afterOneDay(BACKSTAGE, sellIn, quality).quality).toBe(50);
    });
  });
});
