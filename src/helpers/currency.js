export const formatPrice = (amount, currency = "eur") => {
  let price = (amount / 100).toFixed(2);
  let numberFormat = new Intl.NumberFormat(["es-ES"], {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
  });
  return numberFormat.format(price);
};
