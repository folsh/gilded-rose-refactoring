import { Item, GildedRose, AGED_BRIE, BACKSTAGE_PASSES, SULFURAS } from '@/gilded-rose';

// The three category names come from the production code so a rename there
// breaks compilation instead of silently turning these tests into normal items.
export { AGED_BRIE, BACKSTAGE_PASSES, SULFURAS };

export const NORMAL = 'foo';
// Conjured is specified but not implemented yet, so it has no production constant.
export const CONJURED = 'Conjured Mana Cake';

/**
 * Runs a single day on one item and hands back the mutated item.
 * updateQuality() returns this.items, so the item can be read back directly.
 */
export const afterOneDay = (name: string, sellIn: number, quality: number): Item =>
  new GildedRose([new Item(name, sellIn, quality)]).updateQuality()[0];
