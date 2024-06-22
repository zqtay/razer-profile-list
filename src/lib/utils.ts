export const generateRandomHexString = (length: number = 16): string => {
  let result = '';
  const chars = '0123456789abcdef';
  for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};