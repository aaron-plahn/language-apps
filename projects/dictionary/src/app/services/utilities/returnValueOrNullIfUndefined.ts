export default <T>(value: T): T | undefined => {
  if (typeof value === 'undefined') { return null; }
  return value;
};
