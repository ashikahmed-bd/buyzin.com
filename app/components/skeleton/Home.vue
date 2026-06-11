<script setup>

</script>

<template>
    <div class="space-y-6 animate-pulse py-4">
        <section class="container mx-auto px-4">
            <div class="h-48 md:h-96 rounded-2xl bg-gray-200"></div>
        </section>

        <section class="container mx-auto px-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <div v-for="i in 4" :key="i" class="flex gap-4 p-4 border rounded-xl">
                    <div class="w-14 h-14 rounded-lg bg-gray-200"></div>

                    <div class="flex-1">
                        <div class="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                        <div class="h-3 w-full bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        </section>

        <section class="container mx-auto px-4">
            <div class="flex justify-between items-center mb-5">
                <div>
                    <div class="h-6 w-48 bg-gray-200 rounded mb-2"></div>
                    <div class="h-4 w-64 bg-gray-200 rounded"></div>
                </div>
                <div class="h-4 w-20 bg-gray-200 rounded"></div>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <div v-for="i in 5" :key="i" class="bg-white border rounded-xl p-3">
                    <div class="aspect-square bg-gray-200 rounded-lg mb-3"></div>
                    <div class="h-4 bg-gray-200 rounded mb-2"></div>
                    <div class="h-4 w-2/3 bg-gray-200 rounded mb-3"></div>
                    <div class="h-5 w-20 bg-gray-200 rounded"></div>
                </div>
            </div>
        </section>

        <section class="container mx-auto px-4">
            <div class="flex justify-between items-center mb-5">
                <div>
                    <div class="h-6 w-40 bg-gray-200 rounded mb-2"></div>
                    <div class="h-4 w-56 bg-gray-200 rounded"></div>
                </div>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <div v-for="i in 10" :key="i" class="bg-white border rounded-xl p-3">
                    <div class="aspect-square bg-gray-200 rounded-lg mb-3"></div>
                    <div class="h-4 bg-gray-200 rounded mb-2"></div>
                    <div class="h-4 w-2/3 bg-gray-200 rounded mb-3"></div>
                    <div class="h-5 w-20 bg-gray-200 rounded"></div>
                </div>
            </div>
        </section>

        <section class="container mx-auto px-4">
            <div class="flex justify-between items-center mb-5">
                <div>
                    <div class="h-6 w-52 bg-gray-200 rounded mb-2"></div>
                    <div class="h-4 w-64 bg-gray-200 rounded"></div>
                </div>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div v-for="i in 4" :key="i" class="h-64 rounded-2xl bg-gray-200"></div>
            </div>
        </section>

        <section class="container mx-auto px-4">
            <div class="h-6 w-40 bg-gray-200 rounded mb-6"></div>

            <div class="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-10 gap-4">
                <div v-for="i in 10" :key="i" class="border rounded-xl p-4">
                    <div class="w-16 h-16 mx-auto bg-gray-200 rounded-full mb-3"></div>
                    <div class="h-3 bg-gray-200 rounded"></div>
                </div>
            </div>
        </section>

        <section class="container mx-auto px-4">
            <div class="mb-6">
                <div class="h-5 w-24 bg-gray-200 rounded mb-3"></div>
                <div class="h-8 w-64 bg-gray-200 rounded mb-3"></div>
                <div class="h-4 w-full max-w-xl bg-gray-200 rounded"></div>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <div v-for="i in 10" :key="i" class="bg-white border rounded-xl p-3">
                    <div class="aspect-square bg-gray-200 rounded-lg mb-3"></div>
                    <div class="h-4 bg-gray-200 rounded mb-2"></div>
                    <div class="h-4 w-2/3 bg-gray-200 rounded mb-3"></div>
                    <div class="h-5 w-20 bg-gray-200 rounded"></div>
                </div>
            </div>
        </section>
    </div>
</template>
