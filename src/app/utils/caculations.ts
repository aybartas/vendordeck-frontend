export default function displayCalculatedCurrency(price: number | undefined) {
  if (!price) return "-";
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
