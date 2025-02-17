export const calculateDiscountedFare = (date, baseFare) => {
  if (!date || isNaN(new Date(date))) return baseFare;
  const day = new Date(date).getDay();
  const isWeekend = day === 0 || day === 6;
  const discount = isWeekend ? 0.01 : 0.02;
  return baseFare - baseFare * discount;
};
