export default function displayCalculatedCurrency(price: number) {
  if (!price) return "";
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
