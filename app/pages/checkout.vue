<script setup></script>

<template>
  <main class="max-w-7xl mx-auto">
    <Head>
      <Title>
        Checkout | Buyzin - Secure Payment & Fast Delivery in Bangladesh
      </Title>

      <Meta
        name="description"
        content="Complete your order securely. Review billing details, shipping address, and choose a payment method."
      />

      <Meta name="robots" content="noindex, nofollow" />
      <Meta name="referrer" content="no-referrer-when-downgrade" />
    </Head>

    <div class="px-4 py-6">
      <div class="mb-6">
        <h1 class="mt-1 text-xl font-semibold tracking-tight text-slate-900">
          Complete your order
        </h1>

        <p class="mt-1 text-body">
          Review your business, delivery and payment information.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div class="space-y-5 lg:col-span-8">
          <section class="rounded-xl border border-slate-200/80 bg-white p-5">
            <div class="mb-5 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div
                  class="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700"
                >
                  <UIcon name="i-lucide-building-2" class="h-5 w-5" />
                </div>

                <div>
                  <h2 class="text-title font-semibold">Business Information</h2>

                  <p class="text-sm text-slate-500">
                    Your registered business details
                  </p>
                </div>
              </div>

              <button
                class="text-sm font-medium text-blue-600 transition hover:text-blue-700"
              >
                Edit Profile
              </button>
            </div>

            <div
              class="grid grid-cols-1 gap-x-6 gap-y-5 rounded-lg bg-slate-50 p-4 sm:grid-cols-2 md:grid-cols-3"
            >
              <div>
                <p class="text-sm text-slate-500">Business Name</p>
                <p class="text-body mt-1 font-semibold">ABC Traders Ltd.</p>
              </div>

              <div>
                <p class="text-sm text-slate-500">Contact Person</p>
                <p class="text-body mt-1 font-semibold">Md. Rahim Uddin</p>
              </div>

              <div>
                <p class="text-sm text-slate-500">Phone</p>
                <p class="text-body mt-1 font-semibold">+880 1712 345678</p>
              </div>

              <div>
                <p class="text-sm text-slate-500">Email</p>
                <p class="text-body mt-1 font-semibold">info@abctraders.com</p>
              </div>

              <div>
                <p class="text-sm text-slate-500">Business Type</p>
                <p class="text-body mt-1 font-semibold">Retailer</p>
              </div>

              <div>
                <p class="text-sm text-slate-500">Tax ID (BIN)</p>
                <p class="text-body mt-1 font-semibold">123456789012</p>
              </div>
            </div>
          </section>

          <section class="rounded-xl border border-border bg-white p-4">
            <div class="mb-5 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div
                  class="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700"
                >
                  <UIcon name="i-lucide-truck" class="h-5 w-5" />
                </div>

                <div>
                  <h2 class="text-title font-semibold">Shipping Information</h2>

                  <p class="text-sm text-slate-500">
                    Choose where your order should be delivered
                  </p>
                </div>
              </div>
            </div>

            <div class="space-y-3">
              <label
                class="block cursor-pointer rounded-xl border-2 border-blue-500 bg-blue-50/30 p-4 transition"
              >
                <div class="flex gap-3">
                  <input
                    type="radio"
                    name="address"
                    checked
                    class="mt-1 h-4 w-4 accent-blue-600"
                  />

                  <div class="min-w-0 flex-1">
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <div class="flex items-center gap-2">
                          <h3 class="text-body font-semibold">Main Office</h3>

                          <span
                            class="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700"
                          >
                            Default
                          </span>
                        </div>

                        <p class="mt-2 text-sm leading-5 text-slate-500">
                          House 12, Road 8, Sector 4<br />
                          Uttara, Dhaka 1230, Bangladesh
                        </p>
                      </div>

                      <div class="relative">
                        <p class="text-body font-semibold">Md. Rahim Uddin</p>

                        <p class="mt-1 text-sm text-slate-500">
                          +880 1712 345678
                        </p>

                        <button
                          class="absolute right-0 top-0 text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </label>

              <label
                class="block cursor-pointer rounded-xl border border-slate-200 p-4 transition hover:border-slate-300 hover:bg-slate-50/50"
              >
                <div class="flex gap-3">
                  <input
                    type="radio"
                    name="address"
                    class="mt-1 h-4 w-4 accent-blue-600"
                  />

                  <div class="min-w-0 flex-1">
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <h3 class="text-body font-semibold">Warehouse</h3>

                        <p class="mt-2 text-sm leading-5 text-slate-500">
                          Plot 25, Block B, Export Zone<br />
                          Chattogram 4207, Bangladesh
                        </p>
                      </div>

                      <div class="relative">
                        <p class="text-body font-semibold">Warehouse Manager</p>

                        <p class="mt-1 text-sm text-slate-500">
                          +880 1812 000111
                        </p>

                        <button
                          class="absolute right-0 top-0 text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </label>

              <button
                class="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 py-3 text-sm font-medium text-blue-600 transition hover:border-blue-300 hover:bg-blue-50/40"
              >
                <UIcon name="i-lucide-plus" class="h-4 w-4" />
                Add New Address
              </button>
            </div>
          </section>

          <section class="rounded-xl border border-slate-200/80 bg-white p-5">
            <div class="mb-5 flex items-center gap-3">
              <div
                class="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700"
              >
                <UIcon name="i-lucide-send" class="h-5 w-5" />
              </div>

              <div>
                <h2 class="text-title font-semibold">Shipping Method</h2>

                <p class="text-sm text-slate-500">
                  Select your preferred delivery option
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label
                class="flex cursor-pointer items-center justify-between rounded-xl border-2 border-blue-500 bg-blue-50/30 p-4"
              >
                <div class="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked
                    class="h-4 w-4 accent-blue-600"
                  />

                  <div>
                    <p class="text-body font-semibold">Dhaka City</p>
                    <p class="mt-1 text-sm text-slate-500">1-2 business days</p>
                  </div>
                </div>

                <span class="text-body font-semibold"> ৳ 500 </span>
              </label>

              <label
                class="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-slate-300 hover:bg-slate-50/50"
              >
                <div class="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    class="h-4 w-4 accent-blue-600"
                  />

                  <div>
                    <p class="text-body font-semibold">Outside Dhaka</p>

                    <p class="mt-1 text-sm text-slate-500">3-5 business days</p>
                  </div>
                </div>

                <span class="text-body font-semibold"> ৳ 1,200 </span>
              </label>
            </div>
          </section>
        </div>

        <aside class="space-y-5 lg:col-span-4 sticky top-4">
          <section
            class="rounded-xl border border-border bg-white p-4 space-y-4"
          >
            <div class="flex items-center justify-between py-2.5">
              <div>
                <h2 class="text-title font-semibold">Order Summary</h2>
                <p class="mt-1 text-sm text-slate-500">3 items · 12 pcs</p>
              </div>

              <button
                class="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Edit Cart
              </button>
            </div>

            <div class="space-y-3">
              <article
                v-for="value in 3"
                class="flex items-center gap-2 border-border"
              >
                <div
                  class="flex shrink-0 items-center justify-center rounded bg-slate-50"
                >
                  <img
                    src="https://placehold.co/80x80"
                    class="size-16 object-contain"
                    alt="Premium Cotton T-Shirt"
                  />
                </div>

                <div class="min-w-0 flex-1">
                  <h3 class="text-body font-semibold">
                    Premium Cotton T-Shirt
                  </h3>
                  <div class="flex items-center gap-2">
                    <p class="text-xs text-body">SKU: TS-001</p>
                    <p class="text-xs text-body">Navy · L</p>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-body">
                      ৳ 350 x 5
                    </span>
                    <span class="text-body font-semibold"> ৳ 1,750 </span>
                  </div>
                </div>
              </article>
            </div>

            <div class="space-y-3 border-t border-slate-200 pt-4">
              <div class="flex items-center justify-between">
                <span class="text-sm text-slate-500"> Subtotal </span>
                <span class="text-sm font-semibold text-slate-900">
                  ৳ 5,980
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-slate-500"> Shipping </span>

                <span class="text-sm font-semibold text-slate-900">
                  ৳ 500
                </span>
              </div>

              <div class="flex items-center justify-between">
                <span class="text-sm text-slate-500"> VAT (15%) </span>

                <span class="text-sm font-semibold text-slate-900">
                  ৳ 897
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-body font-semibold"> Total Amount </span>
                <span class="text-xl font-bold text-emerald-600">
                  ৳ 7,377
                </span>
              </div>
            </div>

            <div class="mb-5 flex items-center gap-3">
              <div
                class="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700"
              >
                <UIcon name="i-lucide-credit-card" class="h-5 w-5" />
              </div>

              <div>
                <h2 class="text-title font-semibold">Payment Method</h2>
                <p class="text-sm text-slate-500">Choose how you want to pay</p>
              </div>
            </div>

            <div class="space-y-2">
              <label
                class="flex cursor-pointer items-start gap-2 rounded border-2 border-blue-500 bg-blue-50/30 p-4"
              >
                <input
                  type="radio"
                  name="payment"
                  checked
                  class="mt-1 h-4 w-4 accent-blue-600"
                />

                <div>
                  <p class="text-body font-semibold">Bank Transfer (B2B)</p>

                  <p class="mt-1 text-sm leading-5 text-slate-500">
                    Pay via bank transfer. Our team will confirm manually.
                  </p>
                </div>
              </label>

              <label
                class="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-slate-300 hover:bg-slate-50/50"
              >
                <input
                  type="radio"
                  name="payment"
                  class="mt-1 h-4 w-4 accent-blue-600"
                />

                <div>
                  <p class="text-body font-semibold">Cash on Delivery (COD)</p>
                  <p class="mt-1 text-sm leading-5 text-slate-500">
                    Available for approved business accounts only.
                  </p>
                </div>
              </label>

              <label
                class="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-slate-300 hover:bg-slate-50/50"
              >
                <input
                  type="radio"
                  name="payment"
                  class="mt-1 h-4 w-4 accent-blue-600"
                />

                <div>
                  <p class="text-body font-semibold">Credit Terms</p>
                  <p class="mt-1 text-sm leading-5 text-slate-500">
                    Pay later for verified business partners.
                  </p>
                </div>
              </label>
            </div>

            <button
              class="w-full flex items-center justify-center rounded bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              Place Order
              <UIcon name="i-lucide-arrow-right" class="ml-2 h-4 w-4" />
            </button>
          </section>
        </aside>
      </div>
    </div>
  </main>
</template>
