export const formatPrice = (number) => {
  const newNumber = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);
  return newNumber;
};

export const getUniqueValues = (data, type) => {
  let allTypes = data.map((item) => item[type]);
  // colors are arrays of arrays, so need to flatten it
  if (type === "colors") {
    allTypes = allTypes.flat();
  }
  let unique = new Set(allTypes);
  return ["all", ...unique];
};
