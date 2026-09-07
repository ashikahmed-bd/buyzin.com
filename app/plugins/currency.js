export default defineNuxtPlugin(() => {
  const currency = (amount, currency = "BDT") => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: currency,
    }).format(Number(amount));
  };

  return {
    provide: {
      currency,
    },
  };
});
