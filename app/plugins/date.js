export default defineNuxtPlugin(() => {
  const date = (
    date,
    options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  ) => {
    if (!date) return "";

    return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
  };

  return {
    provide: {
      date,
    },
  };
});
