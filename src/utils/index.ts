export const numberWithCommas = (x: number) => {
  return x.toString().split('.').join(',');
};
