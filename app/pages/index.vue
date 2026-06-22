<script setup>
const appStore = useAppStore();
const categoryStore = useCategoryStore();

const { data: home, pending, error, refresh } = await useAsyncData("home", async () => {
    return await appStore.getHome();
});

const { data: categories } = useAsyncData("categories", async () => {
    return categoryStore.getCategories();
});


</script>

<template>
    <SkeletonHome v-if="pending" />

    <ErrorState v-else-if="error" :retry="refresh" />

    <main v-else-if="home">
        <SeoMeta title="Buyzin | Simplify Your Shopping. | Best Deals on Fashion, Gadgets & Lifestyle in Bangladesh"
            description="Buyzin is Bangladesh’s trusted online shopping platform offering authentic fashion, electronics, gadgets, and lifestyle products with fast delivery and secure payments."
            keywords="ecommerce, online shopping, buy online, fashion, gadgets, electronics, Bangladesh, best price, quick delivery, Buyzin" />

        <section class="container mx-auto px-4 py-4">
            <div class="flex items-start gap-6">
                <aside class="hidden md:block w-72 shrink-0">
                    <nav v-if="categories?.data">
                        <UDropdownMenu v-for="parent in categories?.data" :key="parent.id" :items="parent.children.map((item) => ({
                            label: item.name,
                            to: `/categories/${parent.slug}/${item.slug}`,
                            children: item.children?.map((child) => ({
                                label: child.name,
                                to: `/categories/${parent.slug}/${item.slug}/${child.slug}`,
                                children: child.children?.map((sub) => ({
                                    label: sub.name,
                                    to: `/categories/${parent.slug}/${item.slug}/${child.slug}/${sub.slug}`,
                                })),
                            })),
                        }))" :ui="{ content: 'w-60' }" class="w-full">
                            <UButton color="neutral" variant="ghost" class="w-full flex items-center gap-2">
                                <NuxtImg :src="parent.icon_url" :alt="parent.name" class="size-4 shrink-0" />
                                <span class="flex-1 text-left"> {{ parent.name }} </span>
                                <UIcon name="i-lucide-chevron-right" class="size-4 shrink-0" />
                            </UButton>
                        </UDropdownMenu>
                    </nav>
                </aside>

                <main class="flex-1">
                    <UCarousel v-slot="{ item }" loop wheel-gestures fade :items="home?.banners"
                        :autoplay="{ delay: 3000, pauseOnHover: true }" class="w-full">
                        <a :href="item?.target_url" target="_blank" rel="noopener noreferrer"
                            class="relative block overflow-hidden rounded group">
                            <NuxtImg :src="item.image_url" :alt="item.title?.trim()" loading="eager"
                                class="w-full h-full object-cover object-center" />
                        </a>
                    </UCarousel>
                </main>
            </div>
        </section>

        <section class="py-6 bg-gray-50">
            <div class="container mx-auto px-4">
                <UCarousel v-if="home?.categories?.length" v-slot="{ item }" loop :autoplay="{ delay: 3500 }"
                    :items="home?.categories" :ui="{
                        item: 'basis-1/3 sm:basis-1/4 md:basis-1/6 lg:basis-1/8 px-2'
                    }">
                    <NuxtLink :to="`/categories/${item.slug}`"
                        class="group relative block overflow-hidden border border-border rounded-xl bg-white transition-all duration-300 hover:-translate-y-1 h-40 text-center p-2.5">
                        <NuxtImg :src="item.image_url" :alt="item.name" loading="lazy"
                            class="mx-auto object-cover rounded-xl transition-transform duration-500 group-hover:scale-110" />

                        <h3 class="mt-2 text-sm font-semibold truncate w-full">
                            {{ item.name }}
                        </h3>
                    </NuxtLink>
                </UCarousel>
            </div>
        </section>

        <section class="py-6 bg-gray-50">
            <div class="container mx-auto px-4">
                <div class="flex items-center justify-between mb-5">
                    <div class="block">
                        <h2 class="text-2xl font-bold text-gray-900">
                            {{ home?.promotions?.title }}
                        </h2>
                        <p class="text-sm text-gray-500 mt-1">
                            {{ home?.promotions?.subtitle }}
                        </p>
                    </div>
                </div>

                <UCarousel v-if="home?.promotions?.items?.length" v-slot="{ item }" loop :autoplay="{ delay: 3000 }"
                    :items="home?.promotions?.items" :ui="{
                        item: 'basis-1/2 sm:basis-1/2 md:basis-1/4 lg:basis-1/5'
                    }">
                    <CycloneProductCard :product="item" />
                </UCarousel>
            </div>
        </section>


        <section class="container mx-auto px-4 py-8">
            <div class="flex items-center justify-between py-2.5">
                <h3 class="text-2xl font-bold text-slate-900">
                    Popular Stores
                </h3>

                <a href="#" class="flex items-center gap-2 text-sm font-medium text-primary">
                    View All Stores
                    <UIcon name="i-lucide-arrow-right" />
                </a>
            </div>

            <div class="block">
                <UCarousel v-if="home?.stores?.length" v-slot="{ item }" loop :autoplay="{ delay: 3500 }"
                    :items="home?.stores" :ui="{
                        item: 'basis-1/2 sm:basis-1/4 md:basis-1/4 lg:basis-1/5'
                    }">
                    <NuxtLink :to="`/stores/${item.slug}`" class="flex items-center gap-4 rounded-2xl border border-border bg-white
               transition duration-300 hover:border-primary p-2.5">
                        <div class="size-16 flex items-center justify-center rounded-2xl bg-slate-100 shrink-0">
                            <NuxtImg :src="item.logo_url" :alt="item.name" class="size-12 object-contain" />
                        </div>

                        <div class="min-w-0 flex-1">
                            <div class="flex items-center gap-1">
                                <h4 class="font-semibold text-title truncate">
                                    {{ item.name }}
                                </h4>

                                <UIcon v-if="item.verified" name="i-heroicons-check-badge"
                                    class="text-green-600 w-4 h-4" />
                            </div>

                            <div class="mt-1 flex items-center gap-1 text-xs">
                                <UIcon name="i-heroicons-star-solid" class="text-yellow-500 w-4 h-4" />

                                <span class="font-medium">{{ item.rating }}</span>

                                <span class="text-body">
                                    ({{ item.reviews_count }} reviews)
                                </span>
                            </div>
                        </div>
                    </NuxtLink>
                </UCarousel>
            </div>
        </section>


        <section class="py-4">
            <div class="container mx-auto px-4">
                <div class="block">
                    <h2 class="text-2xl font-bold text-gray-800">
                        {{ home?.top_sales?.title }}
                    </h2>
                    <span class="text-gray-600 text-sm mt-1">
                        {{ home?.top_sales?.subtitle }}</span>
                </div>

                <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    <ProductCard v-for="(product, index) in home?.top_sales?.items" :key="index" :product="product" />
                </div>
            </div>
        </section>



        <section class="py-4">
            <div class="container mx-auto px-4">
                <div class="block">
                    <h2 class="text-2xl font-bold text-gray-800">
                        {{ home?.brands?.title }}
                    </h2>
                    <span class="text-gray-600 text-sm mt-1">
                        {{ home?.brands?.subtitle }}</span>
                </div>

                <UCarousel v-if="home?.brands?.items?.length" v-slot="{ item }" loop :autoplay="{ delay: 2000 }"
                    :items="home?.brands?.items" :ui="{ item: 'basis-1/3 md:basis-1/10' }">
                    <NuxtLink :to="{
                        path: `/brands/${item.slug}`,
                        query: {
                            sort: 'default',
                        },
                    }"
                        class="bg-white flex flex-col items-center text-center border border-border hover:border-primary rounded p-2 transition">
                        <NuxtImg :src="item.logo_url" :alt="item.name" loading="lazy"
                            class="w-20 h-20 object-contain mb-2" />
                        <span class="text-sm font-medium line-clamp-1">{{
                            item.name
                        }}</span>
                    </NuxtLink>
                </UCarousel>
            </div>
        </section>

        <section class="py-4">
            <div class="container mx-auto px-4">
                <div class="flex items-center justify-between gap-4 py-6">
                    <div class="max-w-2xl">
                        <div
                            class="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                            <span class="h-2 w-2 rounded-full bg-primary"></span>
                            Trending Now
                        </div>

                        <h2 class="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
                            {{ home?.trending?.title }}
                        </h2>

                        <p class="mt-2 text-sm leading-6 text-gray-600 md:text-base">
                            {{ home?.trending?.subtitle }}
                        </p>
                    </div>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 py-6">
                    <ProductCard v-for="(product, index) in home?.trending?.items" :key="index" :product="product" />
                </div>

                <div class="flex items-center justify-center py-6">
                    <NuxtLink :to="{
                        path: `/shop`,
                        query: {
                            min_price: '',
                            max_price: '',
                            rating: '',
                            sort: 'default',
                        },
                    }"
                        class="px-4 py-2.5 text-sm font-medium text-white bg-primary rounded hover:bg-primary focus:outline-none transition">
                        Load more</NuxtLink>
                </div>
            </div>
        </section>

        <section class="py-4">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <div v-for="item in home?.features" :key="item.title"
                        class="group flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-4 transition-all duration-300 hover:-translate-y-1">
                        <div
                            class="flex size-14 items-center justify-center rounded-lg bg-gray-100 group-hover:bg-primary/10 transition">
                            <NuxtImg :src="item.icon_url" :alt="item.title" class="size-12 object-contain" />
                        </div>

                        <div>
                            <h4 class="text-base font-semibold text-gray-900 leading-tight">
                                {{ item.title }}
                            </h4>
                            <p class="text-sm text-gray-500 leading-relaxed">
                                {{ item.subtitle }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

</template>

<style scoped></style>
