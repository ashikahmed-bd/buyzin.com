<script setup>
const form = reactive({
    name: "Buyzin User",
    email: "user@buyzin.com",
    phone: "+8801XXXXXXXXX",
    address: "Dhaka, Bangladesh",
})

const passwordForm = reactive({
    current_password: "",
    new_password: "",
    confirm_password: "",
})

const notifications = reactive({
    email: true,
    sms: false,
    promotions: true,
})

const saveProfile = () => {
    console.log("Profile saved", form)
}

const changePassword = () => {
    console.log("Password updated", passwordForm)
}
</script>

<template>
    <Dashboard>
        <div class=" bg-white p-4 md:p-6">
            <div class="max-w-6xl mx-auto space-y-6">
                <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
                    <div>
                        <h1 class="text-2xl font-semibold text-gray-900">
                            Account Settings
                        </h1>
                        <p class="text-sm text-gray-500">
                            Manage your profile, security and preferences
                        </p>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div class="lg:col-span-2 space-y-6">
                        <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <div class="flex items-center justify-between mb-5">
                                <h2 class="font-semibold text-gray-900">Profile Information</h2>
                                <span class="text-xs text-gray-400">Basic details</span>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input v-model="form.name"
                                    class="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                                    placeholder="Full Name" />

                                <input v-model="form.email"
                                    class="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                                    placeholder="Email" />

                                <input v-model="form.phone"
                                    class="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                                    placeholder="Phone" />

                                <input v-model="form.address"
                                    class="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                                    placeholder="Address" />
                            </div>

                            <button @click="saveProfile"
                                class="mt-5 px-5 py-2.5 bg-black text-white rounded-xl text-sm hover:bg-gray-800 transition">
                                Save Changes
                            </button>
                        </div>

                        <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <div class="mb-5">
                                <h2 class="font-semibold text-gray-900">Security</h2>
                                <p class="text-xs text-gray-500">Change your password</p>
                            </div>

                            <div class="space-y-3">
                                <input v-model="passwordForm.current_password" type="password"
                                    class="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                                    placeholder="Current Password" />

                                <input v-model="passwordForm.new_password" type="password"
                                    class="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                                    placeholder="New Password" />

                                <input v-model="passwordForm.confirm_password" type="password"
                                    class="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                                    placeholder="Confirm Password" />
                            </div>

                            <button @click="changePassword"
                                class="mt-5 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700 transition">
                                Update Password
                            </button>
                        </div>
                    </div>

                    <div class="space-y-6">
                        <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center">
                            <div
                                class="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-gray-200 to-gray-100 mb-4">
                            </div>
                            <h3 class="font-semibold text-gray-900">{{ form.name }}</h3>
                            <p class="text-sm text-gray-500">{{ form.email }}</p>
                        </div>

                        <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
                            <h2 class="font-semibold text-gray-900">Preferences</h2>

                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-600">Email Notifications</span>
                                <input type="checkbox" v-model="notifications.email" />
                            </div>

                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-600">SMS Alerts</span>
                                <input type="checkbox" v-model="notifications.sms" />
                            </div>

                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-600">Promotions</span>
                                <input type="checkbox" v-model="notifications.promotions" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Dashboard>
</template>