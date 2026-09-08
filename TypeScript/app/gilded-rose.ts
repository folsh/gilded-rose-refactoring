export const AGED_BRIE = 'Aged Brie';
export const BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert';
export const SULFURAS = 'Sulfuras, Hand of Ragnaros';

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      // Sulfuras is legendary: it never ages and is the documented exception to the
      // 50 ceiling, so it stays out of reach of the helpers, which would clamp 80 to 50.
      if (item.name === SULFURAS) {
        continue;
      }

      if (item.name === AGED_BRIE) {
        this.increaseQuality(item);
      } else if (item.name === BACKSTAGE_PASSES) {
        if (item.sellIn < 6) {
          this.increaseQuality(item, 3);
        } else if (item.sellIn < 11) {
          this.increaseQuality(item, 2);
        } else {
          this.increaseQuality(item);
        }
      } else {
        this.decreaseQuality(item);
      }

      this.decreaseSellIn(item);

      if (item.sellIn < 0) {
        if (item.name === AGED_BRIE) {
          this.increaseQuality(item);
        } else if (item.name === BACKSTAGE_PASSES) {
          item.quality = 0;
        } else {
          this.decreaseQuality(item);
        }
      }
    }

    return this.items;
  }

  private decreaseSellIn(item: Item): void {
    item.sellIn--;
  }

  private increaseQuality(item: Item, amount = 1): void {
    item.quality = Math.min(50, item.quality + amount);
  }

  private decreaseQuality(item: Item, amount = 1): void {
    item.quality = Math.max(0, item.quality - amount);
  }
}
