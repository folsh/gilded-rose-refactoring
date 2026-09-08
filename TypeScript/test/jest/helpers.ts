import { Item, GildedRose } from '@/gilded-rose';

export const NORMAL = 'foo';
export const AGED_BRIE = 'Aged Brie';
export const SULFURAS = 'Sulfuras, Hand of Ragnaros';
export const BACKSTAGE = 'Backstage passes to a TAFKAL80ETC concert';
export const CONJURED = 'Conjured Mana Cake';

/**
 * Runs a single day on one item and hands back the mutated item.
 * updateQuality() returns this.items, so the item can be read back directly.
 */
export const afterOneDay = (name: string, sellIn: number, quality: number): Item =>
  new GildedRose([new Item(name, sellIn, quality)]).updateQuality()[0];
