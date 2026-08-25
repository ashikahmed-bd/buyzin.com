export const useRecentlyViewed = () => {
  const recentlyViewed = useCookie("recently_viewed", {
    default: () => [],
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    sameSite: "lax",
  });

  const add = (product) => {
    recentlyViewed.value = [
      String(product),
      ...recentlyViewed.value.filter((item) => item !== String(product)),
    ].slice(0, 20);
  };

  const remove = (product) => {
    recentlyViewed.value = recentlyViewed.value.filter(
      (item) => item !== String(product),
    );
  };

  const clear = () => {
    recentlyViewed.value = [];
  };

  return {
    recentlyViewed,
    add,
    remove,
    clear,
  };
};
