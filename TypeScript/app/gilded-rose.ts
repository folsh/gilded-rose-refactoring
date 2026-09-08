export const AGED_BRIE = 'Aged Brie';
export const BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert';
export const SULFURAS = 'Sulfuras, Hand of Ragnaros';
export const CONJURED = 'Conjured Mana Cake';

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
      // Sulfuras is legendary: it never ages, and it is the documented exception to
      // the 50 ceiling, so it must never reach the clamping helpers (80 would become 50).
      if (item.name === SULFURAS) {
        continue;
      }

      // Quality first, while the item still has today's sell by date: every update*
      // method reads sellIn before the decrement below.
      this.updateItemQuality(item);
      this.decreaseSellIn(item);
    }

    return this.items;
  }

  private updateItemQuality(item: Item): void {
    if (item.name === AGED_BRIE) {
      this.updateAgedBrie(item);
      return;
    }

    if (item.name === BACKSTAGE_PASSES) {
      this.updateBackstagePass(item);
      return;
    }

    if (item.name === CONJURED) {
      this.updateConjured(item);
      return;
    }

    this.updateNormalItem(item);
  }

  private updateNormalItem(item: Item): void {
    const degradation = this.hasExpired(item) ? 2 : 1;
    this.decreaseQuality(item, degradation);
  }

  private updateAgedBrie(item: Item): void {
    const maturation = this.hasExpired(item) ? 2 : 1;
    this.increaseQuality(item, maturation);
  }

  private updateBackstagePass(item: Item): void {
    if (this.hasExpired(item)) {
      item.quality = 0;
      return;
    }

    if (item.sellIn <= 5) {
      this.increaseQuality(item, 3);
      return;
    }

    if (item.sellIn <= 10) {
      this.increaseQuality(item, 2);
      return;
    }

    this.increaseQuality(item);
  }

  // Conjured items degrade twice as fast as normal ones, before and after the
  // sell by date alike: the normal 1 / 2 rates simply doubled.
  private updateConjured(item: Item): void {
    const degradation = this.hasExpired(item) ? 4 : 2;
    this.decreaseQuality(item, degradation);
  }

  // Quality is updated before sellIn is decremented, so the sell by date has already
  // passed at sellIn <= 0 here — the legacy code tested sellIn < 0 after the decrement.
  private hasExpired(item: Item): boolean {
    return item.sellIn <= 0;
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
