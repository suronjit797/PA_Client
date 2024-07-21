export const serialNumber = (page = 1, limit = 10, index = 0) => {
  const p = Math.abs(Number(page || 1) - 1);
  const l = Math.abs(Number(limit));
  const i = Math.abs(Number(index)) + 1;

  return p * l + i;
};
