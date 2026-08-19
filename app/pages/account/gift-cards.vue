<script setup>
const giftCards = [
  {
    id: 1,
    title: "ShopHub Gift Card",
    message: "For Everything You Love",
    code: "SHC-****-****-B7K",
    balance: "$100.00",
    status: "Available",
    statusClass: "bg-emerald-50 text-emerald-600",
    expiry: "31 Dec 2026",
    imageClass: "bg-violet-600",
    icon: "i-lucide-gift",
  },
  {
    id: 2,
    title: "ShopHub Gift Card",
    message: "Happy Birthday!",
    code: "SHC-****-****-3H2L",
    balance: "$50.00",
    status: "Available",
    statusClass: "bg-emerald-50 text-emerald-600",
    expiry: "15 Nov 2026",
    imageClass: "bg-slate-900",
    icon: "i-lucide-gift",
  },
  {
    id: 3,
    title: "ShopHub Gift Card",
    message: "Thank You!",
    code: "SHC-****-****-91KP",
    balance: "$25.00",
    status: "Partially Used",
    statusClass: "bg-orange-50 text-orange-600",
    expiry: "20 Oct 2026",
    imageClass: "bg-sky-900",
    icon: "i-lucide-gift",
  },
  {
    id: 4,
    title: "ShopHub Gift Card",
    message: "Best Wishes!",
    code: "SHC-****-****-7D4M",
    balance: "$0.00",
    status: "Used",
    statusClass: "bg-gray-100 text-gray-500",
    expiry: "10 Sep 2025",
    imageClass: "bg-fuchsia-600",
    icon: "i-lucide-gift",
  },
  {
    id: 5,
    title: "ShopHub Gift Card",
    message: "Best Wishes!",
    code: "SHC-****-****-28BN",
    balance: "$20.00",
    status: "Available",
    statusClass: "bg-emerald-50 text-emerald-600",
    expiry: "05 Aug 2026",
    imageClass: "bg-emerald-700",
    icon: "i-lucide-gift",
  },
  {
    id: 6,
    title: "ShopHub Gift Card",
    message: "Happy Anniversary!",
    code: "SHC-****-****-62QR",
    balance: "$50.00",
    status: "Available",
    statusClass: "bg-emerald-50 text-emerald-600",
    expiry: "01 Jul 2026",
    imageClass: "bg-slate-800",
    icon: "i-lucide-gift",
  },
];
const giftCardDesigns = [
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
const quickActions = [
  {
    title: "Buy Gift Card",
    description: "Purchase a new gift card",
    icon: "i-lucide-gift",
    class: "bg-violet-50 text-violet-500",
  },
  {
    title: "Send a Gift Card",
    description: "Send to your loved ones",
    icon: "i-lucide-send",
    class: "bg-blue-50 text-blue-500",
  },
  {
    title: "Check Balance",
    description: "Check any gift card balance",
    icon: "i-lucide-refresh-cw",
    class: "bg-emerald-50 text-emerald-500",
  },
  {
    title: "Transaction History",
    description: "View all gift card transactions",
    icon: "i-lucide-clock-3",
    class: "bg-orange-50 text-orange-500",
  },
];
const faqs = [
  "How do gift cards work?",
  "Can I use multiple gift cards?",
  "What if my gift card expires?",
  "Where can I check my balance?",
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
          <UIcon name="i-lucide-plus" class="size-4" /> Buy New Gift Card
        </NuxtLink>
      </div>
      <div class="space-y-4 py-5">
        <section class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <article class="rounded-lg border border-border bg-white p-4">
            <div class="flex items-center gap-3">
              <div
                class="flex size-10 items-center justify-center rounded-full bg-violet-50 text-violet-500"
              >
                <UIcon name="i-lucide-wallet-cards" class="size-5" />
              </div>
              <div>
                <p class="text-xs text-body">Total Balance</p>
                <p class="text-base font-semibold text-title">$245.00</p>
              </div>
            </div>
            <NuxtLink
              to="/account/gift-cards"
              class="mt-3 inline-flex items-center gap-1 text-xs font-medium text-violet-500"
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
                <p class="text-base font-semibold text-title">$195.00</p>
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
                <p class="text-base font-semibold text-title">$50.00</p>
              </div>
            </div>
            <NuxtLink
              to="/account/gift-cards/history"
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
                <p class="text-base font-semibold text-title">6</p>
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
                  label: 'My Gift Cards (6)',
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
                        <th class="px-3 py-2.5 font-medium text-body">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="card in giftCards"
                        :key="card.id"
                        class="border-b border-border last:border-b-0"
                      >
                        <td class="px-3 py-3">
                          <div class="flex min-w-[190px] items-center gap-2.5">
                            <div
                              class="flex h-10 w-16 shrink-0 items-center justify-center rounded-md text-white"
                              :class="card.imageClass"
                            >
                              <div class="text-center">
                                <UIcon :name="card.icon" class="size-4" />
                                <p class="mt-0.5 text-[7px] font-semibold">
                                  SHOPHUB
                                </p>
                              </div>
                            </div>
                            <div class="min-w-0">
                              <p
                                class="truncate text-sm font-medium text-title"
                              >
                                {{ card.title }}
                              </p>
                              <p class="mt-0.5 text-xs text-body">
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
                          {{ card.balance }}
                        </td>
                        <td class="px-3 py-3">
                          <span
                            class="whitespace-nowrap rounded px-2 py-1 text-xs font-medium"
                            :class="card.statusClass"
                          >
                            {{ card.status }}
                          </span>
                        </td>
                        <td
                          class="whitespace-nowrap px-3 py-3 text-xs text-body"
                        >
                          {{ card.expiry }}
                        </td>
                        <td class="px-3 py-3">
                          <div class="flex items-center gap-2">
                            <NuxtLink
                              :to="`/account/gift-cards/${card.id}`"
                              class="inline-flex items-center justify-center rounded border border-border px-2.5 py-1.5 text-xs font-medium text-primary"
                            >
                              View
                            </NuxtLink>
                          </div>
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
                <NuxtLink
                  v-for="action in quickActions"
                  :key="action.title"
                  to="#"
                  class="flex gap-3"
                >
                  <span
                    class="flex size-8 shrink-0 items-center justify-center rounded-full"
                    :class="action.class"
                  >
                    <UIcon :name="action.icon" class="size-4" />
                  </span>
                  <span>
                    <span class="block text-sm font-medium text-title">
                      {{ action.title }}
                    </span>
                    <span class="mt-0.5 block text-xs text-body">
                      {{ action.description }}
                    </span>
                  </span>
                </NuxtLink>
              </div>
            </section>

            <section class="rounded border border-border bg-white p-4">
              <h2 class="text-sm font-semibold text-title">FAQs</h2>
              <div class="mt-3 divide-y divide-border">
                <details v-for="faq in faqs" :key="faq" class="group py-2.5">
                  <summary
                    class="flex cursor-pointer list-none items-center justify-between gap-3 text-xs font-medium text-title"
                  >
                    {{ faq }}
                    <UIcon
                      name="i-lucide-chevron-down"
                      class="size-3.5 shrink-0 transition-transform group-open:rotate-180"
                    />
                  </summary>
                  <p class="mt-2 text-xs leading-5 text-body">
                    You can manage your gift cards and check the latest
                    information from your account.
                  </p>
                </details>
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
            loop
            :autoplay="{ delay: 2000 }"
            wheel-gestures
            :items="giftCardDesigns"
            :ui="{
              item: 'basis-1/4',
            }"
          >
            <NuxtLink
              :key="item.title"
              to="/account/gift-cards/create"
              class="group min-w-0"
            >
              <div
                class="flex h-24 items-center justify-center rounded-md text-white transition-opacity group-hover:opacity-90"
                :class="item.class"
              >
                <div class="text-center">
                  <UIcon :name="item.icon" class="size-6" />
                  <p class="mt-1 text-sm font-semibold">{{ item.title }}</p>
                </div>
              </div>
              <p class="mt-2 truncate text-xs font-medium text-title">
                {{ item.title }}
              </p>
              <p class="mt-0.5 text-xs text-body">{{ item.price }}</p>
            </NuxtLink>
          </UCarousel>
        </section>
      </div>
    </div>
  </Dashboard>
</template>
