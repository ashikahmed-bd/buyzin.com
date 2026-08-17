export const useShipping = () => {
  const shipping = useState("shipping", () => null);

  const { $api } = useNuxtApp();

  const calculate = async (location) => {
    if (!location?.state_id || !location?.city_id || !location?.area_id) {
      shipping.value = null;
      return;
    }

    const response = await $api("/api/shipping/rates", {
      params: location,
    });

    shipping.value = response?.[0] ?? null;

    return shipping.value;
  };

  const clear = () => {
    shipping.value = null;
  };

  return {
    shipping,
    calculate,
    clear,
  };
};
