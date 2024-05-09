export const getSalesPrice = (price: number, sale: number) => {
  const salePrice = (price *= 1 - Number(`0.${sale}`));
  return salePrice;
};
