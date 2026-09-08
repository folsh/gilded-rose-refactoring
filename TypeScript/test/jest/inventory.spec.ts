import { Item, GildedRose } from '@/gilded-rose';
import { NORMAL, AGED_BRIE, SULFURAS, BACKSTAGE_PASSES, CONJURED } from './helpers';

describe('An inventory with several items', () => {
  it('updates every item independently in a single call', () => {
    const gildedRose = new GildedRose([
      new Item(NORMAL, 10, 20),
      new Item(AGED_BRIE, 2, 0),
      new Item(SULFURAS, 0, 80),
      new Item(BACKSTAGE_PASSES, 15, 20),
      new Item(CONJURED, 3, 6),
    ]);

    const [normal, agedBrie, sulfuras, backstage, conjured] = gildedRose.updateQuality();

    expect(normal.sellIn).toBe(9);
    expect(normal.quality).toBe(19);

    expect(agedBrie.sellIn).toBe(1);
    expect(agedBrie.quality).toBe(1);

    expect(sulfuras.sellIn).toBe(0);
    expect(sulfuras.quality).toBe(80);

    expect(backstage.sellIn).toBe(14);
    expect(backstage.quality).toBe(21);

    // Asserted last on purpose: the four implemented categories above are fully
    // verified before this line fails. Turns green once Conjured is implemented.
    expect(conjured.sellIn).toBe(2);
    expect(conjured.quality).toBe(4);
  });
});
