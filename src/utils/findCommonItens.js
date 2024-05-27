export default function findCommonItems(arrays) {
  if (arrays.length === 0) return [];
  return arrays.reduce((acc, array) => {
      return acc.filter(item => array.includes(item));
  });
}