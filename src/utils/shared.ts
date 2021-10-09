export const trimString = (str: string) => {
  return str.trim().replace(/\s{2,}/g, ' ');
};
