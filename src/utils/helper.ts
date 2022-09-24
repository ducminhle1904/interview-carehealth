export function generateCurrency(value: number) {
  if (value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(value))
  }
  return "$ --"
}
