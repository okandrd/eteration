const currenyFormat = (number) => {
  return new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "USD",
  }).format(number);
};

export default currenyFormat;
