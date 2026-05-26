<script setup>
import ProfileLayout from "~/components/ProfileLayout.vue";

const profileStore = useProfileStore();

const form = reactive({
  name: "",
  phone: "",
  email: "",
});

const loadProfile = async () => {
  const response = await profileStore.getProfile();
  form.name = response.data.name;
  form.phone = response.data.phone;
  form.email = response.data.email;
};

const updateProfile = async () => {
  await profileStore.update(form);
};

onMounted(() => {
  loadProfile();
});
</script>

<template>
  <Head>
    <Title
      >My Account | Buyzin - Manage Your Orders & Profile in Bangladesh</Title
    >
    <Meta
      name="description"
      content="Access your Buyzin account to view orders, track shipments, manage your profile, and update your preferences. Enjoy seamless online shopping in Bangladesh."
    />
  </Head>
  <ProfileLayout>
    <div class="bg-white rounded-xl">
      <div
        class="px-4 py-3 border-b border-border flex items-center justify-between"
      >
        <h3 class="text-lg font-semibold text-heading">Personal Information</h3>
      </div>
      <div class="p-4 text-gray-700 relative overflow-x-auto">
        <form @submit.prevent="updateProfile" class="max-w-3xl">
          <div class="grid grid-cols-1 gap-4">
            <BaseInput
              label="Full Name"
              v-model="form.name"
              placeholder="Enter full name"
              error=""
              :required="true"
            />

            <BaseInput
              label="Phone Number"
              v-model="form.phone"
              placeholder="Enter phone"
              error=""
              :required="true"
            />

            <BaseInput
              label="Email"
              v-model="form.email"
              placeholder="Enter email"
              error=""
              :required="true"
            />
          </div>

          <div class="mt-6 flex justify-end">
            <BaseButton :loading="profileStore.loading"
              >Save Changes</BaseButton
            >
          </div>
        </form>
      </div>
    </div>
  </ProfileLayout>
</template>
