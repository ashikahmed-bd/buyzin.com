<script setup>
const wishlist = [
  {
    id: 1,
    product: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    image: "https://placehold.co/200x200",
    rating: 4.8,
    reviews: 245,
    price: "$349.99",
    oldPrice: "$399.99",
    discount: "12% OFF",
    stock: "In Stock",
  },
  {
    id: 2,
    product: "Nike Air Max 270 Men's Shoes",
    image: "https://placehold.co/200x200",
    rating: 4.6,
    reviews: 320,
    price: "$129.99",
    oldPrice: "$159.99",
    discount: "19% OFF",
    stock: "In Stock",
  },
  {
    id: 3,
    product: "Herschel Classic Backpack",
    image: "https://placehold.co/200x200",
    rating: 4.7,
    reviews: 189,
    price: "$59.99",
    oldPrice: "$79.99",
    discount: "25% OFF",
    stock: "In Stock",
  },
  {
    id: 4,
    product: "Apple Watch Series 9 GPS, 41mm",
    image: "https://placehold.co/200x200",
    rating: 4.9,
    reviews: 412,
    price: "$399.00",
    oldPrice: "$429.00",
    discount: "7% OFF",
    stock: "In Stock",
  },
];

const recentlyViewed = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    price: "$1,199.00",
    image: "https://placehold.co/200x200",
  },
  {
    id: 2,
    name: "Adidas Ultraboost Light Running Shoes",
    price: "$159.99",
    image: "https://placehold.co/200x200",
  },
  {
    id: 3,
    name: "Fossil Chronograph Men's Watch",
    price: "$119.00",
    image: "https://placehold.co/200x200",
  },
];

const sortBy = ref("recently-added");

const addToCart = (product) => {
  console.log("Add to cart:", product);
};

const moveAllToCart = () => {
  console.log("Move wishlist to cart");
};

const removeFromWishlist = (product) => {
  console.log("Remove from wishlist:", product);
};

const enablePriceAlerts = () => {
  console.log("Price alerts enabled");
};
</script>

<template>
  <Dashboard>
    <Head>
      <Title>Wishlist | Buyzin</Title>

      <Meta
        name="description"
        content="View and manage your saved products on Buyzin."
      />

      <Meta name="robots" content="noindex, nofollow" />
    </Head>

    <UBreadcrumb
      :items="[
        {
          label: 'Home',
          to: '/',
        },
        {
          label: 'Wishlist',
        },
      ]"
      class="py-4 text-xs"
    />

    <div class="space-y-4">
      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <main class="min-w-0 space-y-4">
          <section
            class="overflow-hidden rounded-lg border border-border bg-white"
          >
            <div
              class="flex flex-col gap-3 border-b border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h1
                  class="text-lg font-bold tracking-tight text-title sm:text-xl"
                >
                  My Wishlist ({{ wishlist.length }})
                </h1>

                <p class="mt-0.5 text-xs text-body">
                  Items you love, all in one place.
                </p>
              </div>

              <select
                v-model="sortBy"
                aria-label="Sort wishlist"
                class="h-9 w-full rounded-md border border-border bg-white px-3 text-xs font-medium text-title outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 sm:w-auto"
              >
                <option value="recently-added">Sort by: Recently Added</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <div class="divide-y divide-border">
              <article
                v-for="item in wishlist"
                :key="item.id"
                class="grid gap-3 px-4 py-4 transition-colors hover:bg-slate-50/70 sm:grid-cols-[64px_minmax(0,1fr)_110px_120px_28px]"
              >
                <NuxtLink :to="`/products/${item.id}`" class="block">
                  <NuxtImg
                    :src="item.image"
                    :alt="item.product"
                    loading="lazy"
                    class="size-16 rounded-md border border-border bg-slate-50 object-cover"
                  />
                </NuxtLink>

                <div class="min-w-0">
                  <NuxtLink
                    :to="`/products/${item.id}`"
                    class="line-clamp-2 text-sm font-semibold leading-5 text-title transition-colors hover:text-primary"
                  >
                    {{ item.product }}
                  </NuxtLink>

                  <div class="mt-1.5 flex items-center gap-1.5">
                    <div class="flex items-center gap-1">
                      <UIcon
                        name="i-lucide-star"
                        class="size-3.5 fill-amber-400 text-amber-400"
                      />

                      <span class="text-xs font-semibold text-amber-500">
                        {{ item.rating }}
                      </span>
                    </div>

                    <span class="text-[11px] text-muted">
                      ({{ item.reviews }})
                    </span>
                  </div>

                  <p class="mt-1 text-[11px] font-medium text-emerald-600">
                    {{ item.stock }}
                  </p>

                  <div class="mt-2 flex items-center gap-2 sm:hidden">
                    <span class="text-sm font-bold text-title">
                      {{ item.price }}
                    </span>

                    <span class="text-[10px] text-muted line-through">
                      {{ item.oldPrice }}
                    </span>

                    <span
                      class="rounded bg-pink-50 px-1.5 py-0.5 text-[9px] font-medium text-pink-500"
                    >
                      {{ item.discount }}
                    </span>
                  </div>

                  <div class="mt-3 flex items-center gap-2 sm:hidden">
                    <button
                      type="button"
                      class="inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-white transition-colors hover:bg-primary/90"
                      @click="addToCart(item)"
                    >
                      <UIcon name="i-lucide-shopping-cart" class="size-3.5" />

                      Add to Cart
                    </button>

                    <button
                      type="button"
                      class="inline-flex h-8 items-center justify-center rounded-md border border-border px-3 text-xs font-medium text-body transition-colors hover:bg-slate-50 hover:text-title"
                      @click="removeFromWishlist(item)"
                    >
                      <UIcon name="i-lucide-trash-2" class="size-3.5" />
                    </button>
                  </div>
                </div>

                <div class="hidden sm:block">
                  <p class="text-sm font-bold text-title">
                    {{ item.price }}
                  </p>

                  <p class="mt-1 text-[10px] text-muted line-through">
                    {{ item.oldPrice }}
                  </p>

                  <span
                    class="mt-1 inline-flex rounded bg-pink-50 px-1.5 py-0.5 text-[9px] font-medium text-pink-500"
                  >
                    {{ item.discount }}
                  </span>
                </div>

                <div class="hidden flex-col gap-1.5 sm:flex">
                  <button
                    type="button"
                    class="inline-flex h-8 items-center justify-center gap-1.5 rounded-md bg-primary px-2 text-xs font-medium text-white transition-colors hover:bg-primary/90"
                    @click="addToCart(item)"
                  >
                    <UIcon name="i-lucide-shopping-cart" class="size-3.5" />

                    Add to Cart
                  </button>

                  <button
                    type="button"
                    class="inline-flex items-center justify-center gap-1 text-[10px] font-medium text-body transition-colors hover:text-title"
                    @click="removeFromWishlist(item)"
                  >
                    <UIcon name="i-lucide-trash-2" class="size-3" />

                    Remove
                  </button>
                </div>
              </article>
            </div>
          </section>

          <section
            class="flex flex-col gap-3 rounded-lg border border-violet-100 bg-violet-50/60 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div class="flex items-center gap-3">
              <div
                class="flex size-10 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600"
              >
                <UIcon name="i-lucide-bell" class="size-4" />
              </div>

              <div>
                <h3 class="text-xs font-semibold text-title">Price Alert</h3>

                <p class="mt-0.5 text-[10px] leading-4 text-body">
                  Get notified when wishlist items go on sale.
                </p>
              </div>
            </div>

            <button
              type="button"
              class="inline-flex h-8 items-center justify-center rounded-md border border-violet-300 bg-white px-3 text-[10px] font-medium text-violet-600 transition-colors hover:bg-violet-50"
              @click="enablePriceAlerts"
            >
              Enable Alerts
            </button>
          </section>
        </main>

        <aside class="space-y-4">
          <section class="rounded-lg border border-border bg-white p-4">
            <h2 class="text-xs font-semibold text-title">Wishlist Summary</h2>

            <div class="mt-4 space-y-4">
              <div class="flex items-center gap-3">
                <div
                  class="flex size-9 items-center justify-center rounded-full bg-violet-50 text-violet-500"
                >
                  <UIcon name="i-lucide-heart" class="size-4 fill-current" />
                </div>

                <div>
                  <p class="text-sm font-bold text-title">
                    {{ wishlist.length }}
                  </p>

                  <p class="text-[10px] text-body">Items in wishlist</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div
                  class="flex size-9 items-center justify-center rounded-full bg-pink-50 text-pink-500"
                >
                  <UIcon name="i-lucide-shopping-bag" class="size-4" />
                </div>

                <div>
                  <p class="text-sm font-bold text-title">$1,377.93</p>

                  <p class="text-[10px] text-body">Total Value</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div
                  class="flex size-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"
                >
                  <UIcon name="i-lucide-tag" class="size-4" />
                </div>

                <div>
                  <p class="text-sm font-bold text-title">Save $328.96</p>

                  <p class="text-[10px] text-body">With current offers</p>
                </div>
              </div>
            </div>
          </section>

          <section class="rounded-lg border border-border bg-white p-4">
            <h2 class="text-xs font-semibold text-title">Recently Viewed</h2>

            <div class="mt-3 divide-y divide-border">
              <div
                v-for="item in recentlyViewed"
                :key="item.id"
                class="flex items-center gap-2.5 py-2.5 first:pt-0 last:pb-0"
              >
                <img
                  :src="item.image"
                  :alt="item.name"
                  width="40"
                  height="40"
                  loading="lazy"
                  class="size-10 rounded-md border border-border bg-slate-50 object-cover"
                />

                <div class="min-w-0 flex-1">
                  <p
                    class="line-clamp-2 text-[10px] font-medium leading-4 text-title"
                  >
                    {{ item.name }}
                  </p>

                  <p class="mt-0.5 text-[10px] font-semibold text-title">
                    {{ item.price }}
                  </p>
                </div>

                <button
                  type="button"
                  class="flex size-7 shrink-0 items-center justify-center rounded-md border border-border text-body transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary"
                  :aria-label="`Add ${item.name} to cart`"
                >
                  <UIcon name="i-lucide-shopping-cart" class="size-3" />
                </button>
              </div>
            </div>
          </section>

          <section class="relative overflow-hidden rounded-lg bg-violet-50 p-4">
            <div class="relative z-10 max-w-[175px]">
              <h2 class="text-sm font-bold text-title">
                Don't Miss Out!
                <span class="text-violet-500">♥</span>
              </h2>

              <p class="mt-1 text-[10px] leading-4 text-body">
                Prices may go up. Add your favorites to cart now.
              </p>

              <button
                type="button"
                class="mt-3 inline-flex h-8 items-center rounded-md bg-violet-600 px-4 text-[10px] font-medium text-white transition-colors hover:bg-violet-700"
                @click="moveAllToCart"
              >
                Go to Cart ({{ wishlist.length }})
              </button>
            </div>

            <div
              class="absolute -bottom-5 -right-3 flex size-20 rotate-6 items-center justify-center rounded-xl border-4 border-violet-200 bg-white"
            >
              <UIcon
                name="i-lucide-shopping-cart"
                class="size-10 text-violet-500"
              />

              <span
                class="absolute -right-2 -top-3 flex size-8 items-center justify-center rounded-full bg-violet-500 text-sm font-bold text-white"
              >
                %
              </span>
            </div>
          </section>
        </aside>
      </div>
    </div>
  </Dashboard>
</template>
