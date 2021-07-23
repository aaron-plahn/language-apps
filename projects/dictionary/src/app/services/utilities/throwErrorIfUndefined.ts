export default <T>(value: T): T => {
  if (typeof value === 'undefined') { throw new Error(`Value is undefined.`); }
  return value;
};
