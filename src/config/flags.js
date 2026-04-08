// ─────────────────────────────────────────────
//  FEATURE FLAGS
//  Toggle features without touching component code
// ─────────────────────────────────────────────

export const FLAGS = {
  /**
   * ENABLE_10ML
   * Set to true when new glass atomisers arrive.
   * When false:
   *   - 10ml option is hidden in the size modal
   *   - "10ml glass · coming soon" shown on cards
   *   - Banner mentions coming soon
   */
  ENABLE_10ML: false,

  /**
   * SHOW_OUT_OF_STOCK
   * Set to true to show "Sold Out" badges on cards.
   * Per-product stock can be managed in products.js
   */
  SHOW_OUT_OF_STOCK: false,
};
