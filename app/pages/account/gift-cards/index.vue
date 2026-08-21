<script setup>
const giftCardStore = useGiftCardStore();

const {
  data: giftCards,
  pending,
  error,
  refresh,
} = await useAsyncData("giftCards", async () => {
  return await giftCardStore.all();
});

const items = [
  {
    title: "Happy Birthday",
    price: "From $10.00",
    class: "bg-violet-600",
    icon: "i-lucide-cake",
  },
  {
    title: "Thank You",
    price: "From $10.00",
    class: "bg-rose-400",
    icon: "i-lucide-heart",
  },
  {
    title: "Happy Anniversary",
    price: "From $10.00",
    class: "bg-slate-800",
    icon: "i-lucide-heart",
  },
  {
    title: "Merry Christmas",
    price: "From $10.00",
    class: "bg-emerald-700",
    icon: "i-lucide-gift",
  },
  {
    title: "Congratulations",
    price: "From $10.00",
    class: "bg-amber-500",
    icon: "i-lucide-party-popper",
  },
  {
    title: "Happy Anniversary",
    price: "From $10.00",
    class: "bg-slate-800",
    icon: "i-lucide-heart",
  },
  {
    title: "Merry Christmas",
    price: "From $10.00",
    class: "bg-emerald-700",
    icon: "i-lucide-gift",
  },
  {
    title: "Congratulations",
    price: "From $10.00",
    class: "bg-amber-500",
    icon: "i-lucide-party-popper",
  },
];

const copyCode = async (code) => {
  try {
    await navigator.clipboard.writeText(code);
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <Dashboard>
    <LoadingState v-if="pending" />

    <ErrorState v-else-if="error" :retry="refresh" />

    <EmptyState v-else-if="!giftCards" />

    <template v-else>
      <Head>
        <Title>Gift Cards | Buyzin</Title>
        <Meta
          name="description"
          content="Manage your Buyzin gift cards, balances and transactions."
        />
        <Meta name="robots" content="noindex, nofollow" />
      </Head>
      <UBreadcrumb
        :items="[
          { label: 'Home', to: '/' },
          { label: 'My Account', to: '/account' },
          { label: 'Gift Cards' },
        ]"
        class="py-4 text-sm"
      />

      <div class="rounded-2xl bg-white px-4">
        <div
          class="flex flex-col gap-4 border-b border-dashed border-border py-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 class="text-lg font-semibold text-title">Gift Cards</h1>
            <p class="mt-1 text-sm text-body">
              Buy, send and manage gift cards for every special occasion.
            </p>
          </div>
          <NuxtLink
            to="/account/gift-cards/create"
            class="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary/90"
          >
            <UIcon name="i-lucide-plus" class="size-4" /> Buy Gift Card
          </NuxtLink>
        </div>
        <div class="space-y-4 py-5">
          <section class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <article class="rounded-lg border border-border bg-white p-4">
              <div class="flex items-center gap-3">
                <div
                  class="flex size-10 items-center justify-center rounded-full bg-violet-50 text-primary"
                >
                  <UIcon name="i-lucide-wallet-cards" class="size-5" />
                </div>
                <div>
                  <p class="text-xs text-body">Total Balance</p>
                  <p class="text-base font-semibold text-title">
                    {{ giftCards?.total_balance_formatted }}
                  </p>
                </div>
              </div>
              <NuxtLink
                to="/account/gift-cards"
                class="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary"
              >
                View balance details
                <UIcon name="i-lucide-chevron-right" class="size-3" />
              </NuxtLink>
            </article>
            <article class="rounded-lg border border-border bg-white p-4">
              <div class="flex items-center gap-3">
                <div
                  class="flex size-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-500"
                >
                  <UIcon name="i-lucide-gift" class="size-5" />
                </div>
                <div>
                  <p class="text-xs text-body">Available Balance</p>
                  <p class="text-base font-semibold text-title">
                    {{ giftCards?.available_balance_formatted }}
                  </p>
                </div>
              </div>
              <NuxtLink
                to="/account/gift-cards"
                class="mt-3 inline-flex items-center gap-1 text-xs font-medium text-emerald-500"
              >
                View usable cards
                <UIcon name="i-lucide-chevron-right" class="size-3" />
              </NuxtLink>
            </article>
            <article class="rounded-lg border border-border bg-white p-4">
              <div class="flex items-center gap-3">
                <div
                  class="flex size-10 items-center justify-center rounded-full bg-orange-50 text-orange-500"
                >
                  <UIcon name="i-lucide-clock-3" class="size-5" />
                </div>
                <div>
                  <p class="text-xs text-body">Used Balance</p>
                  <p class="text-base font-semibold text-title">
                    {{ giftCards?.used_balance_formatted }}
                  </p>
                </div>
              </div>
              <NuxtLink
                to="/account/gift-cards"
                class="mt-3 inline-flex items-center gap-1 text-xs font-medium text-orange-500"
              >
                View usage history
                <UIcon name="i-lucide-chevron-right" class="size-3" />
              </NuxtLink>
            </article>
            <article class="rounded-lg border border-border bg-white p-4">
              <div class="flex items-center gap-3">
                <div
                  class="flex size-10 items-center justify-center rounded-full bg-blue-50 text-blue-500"
                >
                  <UIcon name="i-lucide-shopping-bag" class="size-5" />
                </div>
                <div>
                  <p class="text-xs text-body">Total Gift Cards</p>
                  <p class="text-base font-semibold text-title">
                    {{ giftCards?.total_gift_cards }}
                  </p>
                </div>
              </div>
              <NuxtLink
                to="/account/gift-cards"
                class="mt-3 inline-flex items-center gap-1 text-xs font-medium text-blue-500"
              >
                View all cards
                <UIcon name="i-lucide-chevron-right" class="size-3" />
              </NuxtLink>
            </article>
          </section>

          <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
            <section
              class="overflow-hidden rounded border border-border bg-white"
            >
              <UTabs
                variant="link"
                :items="[
                  {
                    label: `My Gift Cards (${giftCards?.total_gift_cards ?? 0})`,
                    slot: 'gift-cards',
                  },
                  {
                    label: 'Transactions',
                    slot: 'transactions',
                  },
                ]"
              >
                <template #gift-cards>
                  <div class="w-full overflow-x-auto">
                    <table class="w-full text-sm">
                      <thead>
                        <tr
                          class="border-b border-border bg-gray-50/70 text-left"
                        >
                          <th class="px-3 py-2.5 font-medium text-body">
                            Card Details
                          </th>
                          <th class="px-3 py-2.5 font-medium text-body">
                            Card Code
                          </th>
                          <th class="px-3 py-2.5 font-medium text-body">
                            Balance
                          </th>
                          <th class="px-3 py-2.5 font-medium text-body">
                            Status
                          </th>
                          <th class="px-3 py-2.5 font-medium text-body">
                            Expiry Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="card in giftCards.data"
                          :key="card.id"
                          class="border-b border-border last:border-b-0"
                        >
                          <td class="px-3 py-3">
                            <div class="flex items-center gap-2.5">
                              <NuxtImg
                                :src="card.image"
                                :alt="card.title"
                                class="h-10 w-auto rounded"
                              />

                              <div class="min-w-0">
                                <p
                                  class="truncate text-sm font-medium text-title"
                                >
                                  {{ card.title }}
                                </p>

                                <p class="mt-0.5 truncate text-xs text-body">
                                  {{ card.message }}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td class="whitespace-nowrap px-3 py-3">
                            <button
                              type="button"
                              class="inline-flex items-center gap-1 text-xs text-body hover:text-title"
                              @click="copyCode(card.code)"
                            >
                              {{ card.code }}

                              <UIcon name="i-lucide-copy" class="size-3.5" />
                            </button>
                          </td>

                          <td
                            class="whitespace-nowrap px-3 py-3 text-sm font-medium text-title"
                          >
                            {{ card.balance }} {{ card.currency }}
                          </td>

                          <td class="px-3 py-3">
                            <span
                              class="whitespace-nowrap rounded px-2 py-1 text-xs font-medium"
                              :class="{
                                'bg-green-100 text-green-700':
                                  card.status === 'active',
                                'bg-gray-100 text-gray-700':
                                  card.status === 'redeemed',
                                'bg-red-100 text-red-700':
                                  card.status === 'expired',
                                'bg-yellow-100 text-yellow-700':
                                  card.status === 'inactive',
                              }"
                            >
                              {{ card.status }}
                            </span>
                          </td>

                          <td
                            class="whitespace-nowrap px-3 py-3 text-xs text-body"
                          >
                            <span v-if="card.expires_at">
                              {{ $date(card.expires_at) }}
                            </span>

                            <span v-else> No expiry </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </template>

                <template #transactions>d </template>
              </UTabs>
            </section>
            <aside class="space-y-4">
              <section class="rounded-lg border border-border bg-white p-4">
                <h2 class="text-sm font-semibold text-title">Quick Actions</h2>
                <div class="mt-4 space-y-4">
                  <div class="space-y-4">
                    <button type="button" class="flex w-full gap-3 text-left">
                      <span
                        class="flex size-8 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-500"
                      >
                        <UIcon name="i-lucide-gift" class="size-4" />
                      </span>

                      <span>
                        <span class="block text-sm font-medium text-title">
                          Buy Gift Card
                        </span>
                        <span class="mt-0.5 block text-xs text-body">
                          Purchase a new gift card
                        </span>
                      </span>
                    </button>

                    <button type="button" class="flex w-full gap-3 text-left">
                      <span
                        class="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-500"
                      >
                        <UIcon name="i-lucide-send" class="size-4" />
                      </span>

                      <span>
                        <span class="block text-sm font-medium text-title">
                          Send a Gift Card
                        </span>
                        <span class="mt-0.5 block text-xs text-body">
                          Send to your loved ones
                        </span>
                      </span>
                    </button>

                    <button type="button" class="flex w-full gap-3 text-left">
                      <span
                        class="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-500"
                      >
                        <UIcon name="i-lucide-refresh-cw" class="size-4" />
                      </span>

                      <span>
                        <span class="block text-sm font-medium text-title">
                          Check Balance
                        </span>
                        <span class="mt-0.5 block text-xs text-body">
                          Check any gift card balance
                        </span>
                      </span>
                    </button>

                    <button type="button" class="flex w-full gap-3 text-left">
                      <span
                        class="flex size-8 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500"
                      >
                        <UIcon name="i-lucide-clock-3" class="size-4" />
                      </span>

                      <span>
                        <span class="block text-sm font-medium text-title">
                          Transaction History
                        </span>
                        <span class="mt-0.5 block text-xs text-body">
                          View all gift card transactions
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              </section>

              <section class="rounded border border-border bg-white p-4">
                <h2 class="text-sm font-semibold text-title">FAQs</h2>
                <div class="mt-3 divide-y divide-border">
                  <div>
                    <details class="group py-2.5">
                      <summary
                        class="flex cursor-pointer list-none items-center justify-between gap-3 text-xs font-medium text-title"
                      >
                        How do gift cards work?

                        <UIcon
                          name="i-lucide-chevron-down"
                          class="size-3.5 shrink-0 transition-transform group-open:rotate-180"
                        />
                      </summary>

                      <p class="mt-2 text-xs leading-5 text-body">
                        Gift cards can be used to purchase eligible products
                        from your account. The available balance will be
                        deducted automatically when you make a purchase.
                      </p>
                    </details>

                    <details class="group py-2.5">
                      <summary
                        class="flex cursor-pointer list-none items-center justify-between gap-3 text-xs font-medium text-title"
                      >
                        Can I use multiple gift cards?

                        <UIcon
                          name="i-lucide-chevron-down"
                          class="size-3.5 shrink-0 transition-transform group-open:rotate-180"
                        />
                      </summary>

                      <p class="mt-2 text-xs leading-5 text-body">
                        Yes, you can use multiple gift cards on a single
                        purchase, depending on the available balance and
                        checkout rules.
                      </p>
                    </details>

                    <details class="group py-2.5">
                      <summary
                        class="flex cursor-pointer list-none items-center justify-between gap-3 text-xs font-medium text-title"
                      >
                        What if my gift card expires?

                        <UIcon
                          name="i-lucide-chevron-down"
                          class="size-3.5 shrink-0 transition-transform group-open:rotate-180"
                        />
                      </summary>

                      <p class="mt-2 text-xs leading-5 text-body">
                        Once a gift card expires, it can no longer be used.
                        Please check the expiration date before using your gift
                        card.
                      </p>
                    </details>

                    <details class="group py-2.5">
                      <summary
                        class="flex cursor-pointer list-none items-center justify-between gap-3 text-xs font-medium text-title"
                      >
                        Where can I check my balance?

                        <UIcon
                          name="i-lucide-chevron-down"
                          class="size-3.5 shrink-0 transition-transform group-open:rotate-180"
                        />
                      </summary>

                      <p class="mt-2 text-xs leading-5 text-body">
                        You can check your remaining gift card balance from your
                        Gift Cards section in your account.
                      </p>
                    </details>
                  </div>
                </div>
              </section>
            </aside>
          </div>

          <section class="rounded border border-border bg-white p-4">
            <div class="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 class="text-sm font-semibold text-title">
                  Popular Gift Card Designs
                </h2>
                <p class="mt-1 text-xs text-body">
                  Choose a design for your next gift.
                </p>
              </div>
              <NuxtLink
                to="/gift-cards/designs"
                class="text-xs font-medium text-primary"
              >
                View All Designs
              </NuxtLink>
            </div>

            <UCarousel
              v-slot="{ item }"
              :items="items"
              loop
              :autoplay="{ delay: 2500 }"
              :ui="{
                item: 'basis-1/4',
                content: 'gap-4',
              }"
            >
              <NuxtLink
                :key="item.title"
                to="/account/gift-cards/create"
                class="group block min-w-0"
              >
                <div
                  class="flex h-24 items-center justify-center rounded-md text-white transition-opacity group-hover:opacity-90"
                  :class="item.class"
                >
                  <div class="text-center">
                    <UIcon :name="item.icon" class="size-6" />

                    <p class="mt-1 text-sm font-semibold">
                      {{ item.title }}
                    </p>
                  </div>
                </div>

                <p class="mt-2 truncate text-xs font-medium text-title">
                  {{ item.title }}
                </p>

                <p class="mt-0.5 text-xs text-body">
                  {{ item.price }}
                </p>
              </NuxtLink>
            </UCarousel>
          </section>
        </div>
      </div>
    </template>
  </Dashboard>
</template>
