export const FLAGS = {
  /**
   * ENABLE_10ML — flip to true when 10ml glass atomisers arrive.
   * Controls size modal, card labels, and shipping banner.
   */
  ENABLE_10ML: true,

  /**
   * ENABLE_20ML — flip to true when 20ml bottles are ready.
   * Priced at 1.8× the 10ml price (bulk discount).
   * Independent of ENABLE_10ML — can enable either or both.
   */
  ENABLE_20ML: true,

  SHOW_OUT_OF_STOCK: false,

  /**
   * ENABLE_PARTIALS — flip to true when you have partial bottles to list.
   * Shows a dedicated Partials section on the home page.
   */
  ENABLE_PARTIALS: true,

  /**
   * ENABLE_NEW_ARRIVALS — flip to false to hide the New Arrivals section
   * while you clean up the list.
   */
  ENABLE_NEW_ARRIVALS: false,
};
