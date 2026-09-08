export const useCartStore = defineStore("cart", {
  state: () => ({
    loading: false,
    errors: {},
    items: [],
    taxRate: 5,
    shippingAmount: 100,
  }),

  persist: {
    pick: ["items"],
  },

  getters: {
    subtotal: (state) =>
      state.items.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0,
      ),

    tax: (state) => {
      const subtotal = state.items.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0,
      );

      return subtotal * (Number(state.taxRate) / 100);
    },

    shipping: (state) => {
      if (!state.items.length) return 0;

      // Shipping unavailable
      if (!state.items.every((item) => item.shippingAvailable)) {
        return 0;
      }

      // Subtotal
      const subtotal = state.items.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0,
      );

      // Free shipping
      const freeShipping = state.items.every(
        (item) =>
          item.freeShipping && subtotal >= Number(item.freeShippingLimit || 0),
      );

      if (freeShipping) {
        return 0;
      }

      return Number(state.shippingAmount);
    },

    total: (state) => {
      const subtotal = state.items.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0,
      );

      const tax = subtotal * (Number(state.taxRate) / 100);

      const shipping = Number(state.shippingAmount);

      return subtotal + tax + shipping;
    },
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
          image: product.cover_url,

          price: Number(variant?.price ?? product?.pricing?.min_price ?? 0),

          currency: product.currency,
          unit: product.unit ?? null,

          quantity: Number(quantity),
          stock: Number(variant?.quantity ?? product?.quantity ?? 0),

          moq: Number(product.moq ?? 1),
          orderStep: Number(product.order_step ?? 1),

          // Tax
          taxIncluded: Boolean(product.tax_included ?? false),

          // Shipping
          shippingAvailable: Boolean(product.shipping_available ?? false),

          freeShipping: Boolean(product.free_shipping ?? false),

          freeShippingLimit:
            product.free_shipping_limit !== null
              ? Number(product.free_shipping_limit)
              : null,

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

    async remove(product, variant) {
      const item = this.items.find(
        (item) => item.product === product && item.variant === variant,
      );

      if (!item) return null;

      const index = this.items.indexOf(item);

      this.items.splice(index, 1);

      return item;
    },

    async clear() {
      this.items = [];

      return true;
    },
  },
});
