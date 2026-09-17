<script setup>
const shopStore = useShopStore();

const props = defineProps({
  store: {
    type: Object,
    required: true,
  },
});

const form = reactive({
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
});

const submit = async () => {
  await shopStore.contact(props.store.slug, form);

  form.name = "";
  form.email = "";
  form.phone = "";
  form.subject = "";
  form.message = "";
};
</script>

<template>
  <section class="bg-white rounded-lg border border-border">
    <div class="px-4 py-6">
      <div class="px-4 py-2">
        <div class="mb-5">
          <h2 class="text-base font-semibold text-title">
            Contact Information
          </h2>
          <p class="text-sm text-body">
            Reach out to us through any of the channels below.
          </p>
        </div>
      </div>

      <div
        class="grid grid-cols-1 gap-6 lg:grid-cols-[20rem_minmax(0,1fr)_18rem]"
      >
        <aside class="min-w-0">
          <div class="space-y-4">
            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <div
                  class="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                >
                  <UIcon name="i-lucide-mail" class="size-5" />
                </div>

                <div class="min-w-0">
                  <h3 class="text-sm font-semibold text-title">Email</h3>

                  <a
                    :href="`mailto:${store.email}`"
                    class="mt-0.5 block truncate text-sm text-body hover:text-primary"
                  >
                    {{ store.email }}
                  </a>

                  <p class="mt-0.5 text-sm text-muted">
                    Send us an email anytime
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div
                  class="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                >
                  <UIcon name="i-lucide-phone" class="size-5" />
                </div>

                <div class="min-w-0">
                  <h3 class="text-sm font-semibold text-title">Phone</h3>

                  <a
                    :href="`tel:${store.phone}`"
                    class="mt-0.5 block text-sm text-body hover:text-primary"
                  >
                    {{ store.phone }}
                  </a>

                  <p class="mt-0.5 text-sm text-muted">
                    Call us during business hours
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div
                  class="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                >
                  <UIcon name="i-lucide-message-circle" class="size-5" />
                </div>

                <div class="min-w-0">
                  <h3 class="text-sm font-semibold text-title">WhatsApp</h3>

                  <a
                    :href="store.whatsapp_url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="mt-0.5 block text-sm text-body hover:text-primary"
                  >
                    {{ store.whatsapp }}
                  </a>

                  <p class="mt-0.5 text-sm text-muted">
                    Chat with us on WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <section class="min-w-0">
          <div class="p-4">
            <div class="mb-5">
              <h2 class="text-base font-semibold text-title">
                Send Us a Message
              </h2>
              <p class="text-sm text-body">
                Fill out the form below and we'll get back to you shortly.
              </p>
            </div>

            <form @submit.prevent="submit" class="space-y-2.5">
              <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <BaseInput
                  label="Your name"
                  v-model="form.name"
                  placeholder="Enter your name"
                  :required="true"
                  error=""
                />

                <BaseInput
                  label="Your email"
                  v-model="form.email"
                  placeholder="Enter your email"
                  :required="true"
                  error=""
                />

                <BaseInput
                  label="Phone Number"
                  v-model="form.phone"
                  placeholder="Enter phone number"
                  :required="true"
                  error=""
                />

                <BaseSelect
                  label="Subject"
                  v-model="form.subject"
                  :items="[
                    { label: 'General Inquiry', id: 'General Inquiry' },
                    { label: 'Product Inquiry', id: 'Product Inquiry' },
                    { label: 'Bulk Order', id: 'Bulk Order' },
                    { label: 'Request a Quote', id: 'Request a Quote' },
                    { label: 'Order Support', id: 'Order Support' },
                    { label: 'Shipping & Delivery', id: 'Shipping & Delivery' },
                    { label: 'Return & Refund', id: 'Return & Refund' },
                    { label: 'Payment & Billing', id: 'Payment & Billing' },
                    { label: 'Partnership', id: 'Partnership' },
                    { label: 'Other', id: 'Other' },
                  ]"
                  :required="true"
                  error=""
                />
              </div>

              <BaseTextarea
                label="Message"
                v-model="form.message"
                :required="true"
                error=""
              />

              <button
                type="submit"
                class="flex w-full items-center justify-center gap-2 rounded bg-primary px-4 py-2.5 text-xs font-medium text-white transition hover:opacity-90"
              >
                <UIcon
                  v-if="shopStore.loading"
                  name="i-lucide-loader"
                  class="size-5 animate-spin"
                />
                <UIcon v-else name="i-lucide-send" class="size-5" />
                {{ shopStore.loading ? "Please wait.." : "Send Message" }}
              </button>
            </form>
          </div>
        </section>

        <aside class="min-w-0">
          <div class="relative h-full bg-muted">
            <iframe
              v-if="store.google_map_url"
              :src="store.google_map_url"
              class="block h-full min-h-0 w-full flex-1 rounded"
              allowfullscreen
              loading="lazy"
              referrerpolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>
