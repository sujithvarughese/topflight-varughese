export const convertToUSD = (amount: number, taxRate: number = 0) => {
  amount = amount * (1 + taxRate);
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
}