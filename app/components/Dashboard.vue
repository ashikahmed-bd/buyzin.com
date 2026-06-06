<script setup>
const authStore = useAuthStore();

const logout = async () => {
    if (confirm("Are you sure you went to logout?")) {
        await authStore.logout();
    }
};
</script>

<template>
    <div class="bg-slate-50 py-8">
        <div class="container mx-auto px-4">
            <div class="grid gap-6 lg:grid-cols-12">
                <aside class="lg:col-span-3">
                    <div class="sticky top-24 rounded-2xl bg-white p-4">
                        <div class="border-b border-slate-100 pb-5">
                            <div v-if="authStore?.user" class="flex items-center gap-3">
                                <div class="h-14 w-14 overflow-hidden rounded-full border border-slate-200">
                                    <NuxtImg :src="authStore.user.photo_url" :alt="authStore.user.name"
                                        class="h-full w-full object-cover" width="56" height="56" loading="lazy" />
                                </div>

                                <div class="block">
                                    <h3 class="font-semibold">
                                        {{ authStore?.user?.name }}
                                    </h3>

                                    <p class="text-sm text-slate-500">
                                        {{ authStore?.user?.email }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <nav class="mt-5 space-y-2">
                            <NuxtLink to="/account"
                                class="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition"
                                active-class="bg-primary text-white">
                                <UIcon name="i-lucide-layout-dashboard" class="size-5" />
                                <span>Dashboard</span>
                            </NuxtLink>

                            <NuxtLink to="/account/orders"
                                class="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition"
                                active-class="bg-primary text-white">
                                <UIcon name="i-lucide-package" class="size-5" />
                                <span>My Orders</span>
                            </NuxtLink>

                            <NuxtLink to="/account/wishlist"
                                class="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition"
                                active-class="bg-primary text-white">
                                <UIcon name="i-lucide-heart" class="size-5" />
                                <span>Wishlist</span>
                            </NuxtLink>

                            <NuxtLink to="/account/returns"
                                class="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition"
                                active-class="bg-primary text-white">
                                <UIcon name="i-lucide-rotate-ccw" class="size-5" />
                                <span>Returns & Refunds</span>
                            </NuxtLink>

                            <NuxtLink to="/account/notifications"
                                class="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition"
                                active-class="bg-primary text-white">
                                <UIcon name="i-lucide-bell" class="size-5" />
                                <span>Notifications</span>
                            </NuxtLink>

                            <NuxtLink to="/account/settings"
                                class="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition"
                                active-class="bg-primary text-white">
                                <UIcon name="i-lucide-settings" class="size-5" />
                                <span>Account Settings</span>
                            </NuxtLink>

                            <NuxtLink to="/account/support"
                                class="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition"
                                active-class="bg-primary text-white">
                                <UIcon name="i-lucide-circle-help" class="size-5" />
                                <span>Help & Support</span>
                            </NuxtLink>
                        </nav>
                    </div>
                </aside>

                <main class="lg:col-span-9 space-y-3">
                    <slot />
                </main>
            </div>
        </div>
    </div>
</template>
