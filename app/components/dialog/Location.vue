<script setup>
const locationStore = useLocationStore();

const { calculate } = useShipping();
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  location: {
    type: Object,
    default: () => ({
      state_id: "",
      city_id: "",
      area_id: "",
    }),
  },
});

const emit = defineEmits(["update:open", "update"]);

const form = reactive({
  state_id: "",
  city_id: "",
  area_id: "",
});

const close = () => {
  emit("update:open", false);
};

const update = async () => {
  emit("update", { ...form });

  await calculate({
    state_id: form.state_id,
    city_id: form.city_id,
    area_id: form.area_id,
  });

  close();
};

watch(
  () => form.state_id,
  async (state) => {
    form.city_id = "";
    form.area_id = "";

    locationStore.cities = [];
    locationStore.areas = [];

    if (state) {
      await locationStore.getCities(state);
    }
  },
);

watch(
  () => form.city_id,
  async (city) => {
    form.area_id = "";

    locationStore.areas = [];

    if (city) {
      await locationStore.getAreas(city);
    }
  },
);

watch(
  () => props.open,
  async (open) => {
    if (!open) return;

    await locationStore.getStates();

    form.state_id = props.location?.state_id ?? "";
    form.city_id = props.location?.city_id ?? "";
    form.area_id = props.location?.area_id ?? "";

    if (form.state_id) {
      await locationStore.getCities(form.state_id);
    }

    if (form.city_id) {
      await locationStore.getAreas(form.city_id);
    }
  },
  { immediate: true },
);
</script>

<template>
  <UModal :open="open" @update:open="emit('update:open', $event)">
    <template #header>
      <div>
        <h3 class="text-base font-semibold">Change Location</h3>
        <p class="text-xs text-gray-500">Select your delivery location</p>
      </div>
    </template>
    <template #body>
      <div class="space-y-4">
        <UFormField label="State">
          <USelect
            v-model="form.state_id"
            :items="locationStore.states"
            selected-icon="i-lucide-check"
            value-key="id"
            label-key="name"
            placeholder="Select state"
            :loading="locationStore.loading"
            class="w-full"
          />
        </UFormField>
        <UFormField label="City">
          <USelect
            v-model="form.city_id"
            :items="locationStore.cities"
            selected-icon="i-lucide-check"
            value-key="id"
            label-key="name"
            placeholder="Select city"
            :disabled="!form.state_id"
            :loading="locationStore.loading"
            class="w-full"
          />
        </UFormField>
        <UFormField label="Area">
          <USelect
            v-model="form.area_id"
            :items="locationStore.areas"
            selected-icon="i-lucide-check"
            value-key="id"
            label-key="name"
            placeholder="Select area"
            :disabled="!form.city_id"
            :loading="locationStore.loading"
            class="w-full"
          />
        </UFormField>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end gap-2">
        <UButton color="neutral" variant="soft" @click="close">
          Cancel
        </UButton>
        <UButton
          color="primary"
          :disabled="!form.state_id || !form.city_id || !form.area_id"
          @click="update"
        >
          Update
        </UButton>
      </div>
    </template>
  </UModal>
</template>
