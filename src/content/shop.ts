/**
 * Studio boutique — hair and beauty care products.
 *
 * This is a PLACEHOLDER catalogue. The studio supplies the real product
 * names, prices, and photos; replace the entries below before launch.
 */

export const shopIntro =
  "Alongside the studio floor, Heartbeat keeps a small boutique of hair and beauty care products chosen by the team. Browse below and enquire to purchase — the studio arranges payment and collection directly.";

export type ShopProduct = {
  name: string;
  category: string;
  price: string;
};

export const products: ShopProduct[] = [
  { name: "Hair treatment", category: "Hair Care", price: "Enquire for price" },
  { name: "Hair & scalp oil", category: "Hair Care", price: "Enquire for price" },
  { name: "Styling essential", category: "Hair Care", price: "Enquire for price" },
  { name: "Skincare set", category: "Beauty & Skin", price: "Enquire for price" },
  { name: "Body care", category: "Beauty & Skin", price: "Enquire for price" },
  { name: "Beauty accessory", category: "Beauty & Skin", price: "Enquire for price" },
];
