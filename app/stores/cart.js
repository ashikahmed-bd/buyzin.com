export const useCartStore = defineStore("cart", {
  state: () => ({
    loading: false,
    errors: {},
    items: [],
  }),

  persist: {
    pick: ["items"],
  },

  getters: {
    totalItems: (state) =>
      state.items.reduce((total, item) => total + item.quantity, 0),

    subtotal: (state) =>
      state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      ),

    isEmpty: (state) => state.items.length === 0,
  },

  actions: {
    async add(product, variant, quantity) {
      this.loading = true;

      try {
        const existingItem = this.items.find(
          (item) =>
            item.product === product.id &&
            item.variant === (variant?.id ?? null),
        );

        if (existingItem) {
          existingItem.quantity += Number(quantity);
          await new Promise((resolve) => setTimeout(resolve, 500));
          return existingItem;
        }

        const item = {
          product: product.id,
          variant: variant?.id ?? null,

          name: product.name,
          sku: variant?.sku ?? product.sku ?? null,
          image: product.cover_url ?? null,

          price: Number(variant?.price ?? product?.pricing?.min_price ?? 0),

          currency: product.currency ?? null,
          unit: product.unit ?? null,

          quantity: Number(quantity),

          moq: Number(product.moq ?? 1),
          orderStep: Number(product.order_step ?? 1),

          options:
            variant?.options?.map((option) => ({
              attributeId: option?.attribute?.id ?? null,
              attributeName: option?.attribute?.name ?? null,
              optionId: option?.option?.id ?? null,
              optionName: option?.option?.name ?? null,
            })) ?? [],
        };

        this.items.push(item);
        await new Promise((resolve) => setTimeout(resolve, 500));
        return item;
      } catch (error) {
        this.errors = {
          message: error?.message ?? "Failed to add product to cart.",
        };
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async remove(cartItem) {
      this.loading = true;

      try {
        this.items = this.items.filter(
          (item) =>
            !(
              item.product === cartItem.product &&
              item.variant === cartItem.variant
            ),
        );
      } finally {
        this.loading = false;
      }
    },

    async increment(product, variant, quantity) {
      const item = this.items.find(
        (item) => item.product === product && item.variant === variant,
      );

      if (!item) return null;

      item.quantity = Number(quantity);

      return item;
    },

    async decrement(product, variant, quantity) {
      const item = this.items.find(
        (item) => item.product === product && item.variant === variant,
      );

      if (!item) return null;

      item.quantity = Number(quantity);

      return item;
    },

    async clear() {
      this.loading = true;

      try {
        this.items = [];
      } finally {
        this.loading = false;
      }
    },
  },
});
