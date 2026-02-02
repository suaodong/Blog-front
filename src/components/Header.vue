<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getCategoriesAndTags } from '../api/article';
import type { Category } from '../types';

const route = useRoute();
const router = useRouter();

const categories = ref<Category[]>([]);
const isDark = ref(true);
const searchQuery = ref('');
const searchOpen = ref(false);
const mobileOpen = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  updateTheme();
};

const updateTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

onMounted(async () => {
  // Initialize Theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    isDark.value = savedTheme === 'dark';
  } else {
    isDark.value = true; // Default to dark
  }
  updateTheme();

  try {
    const res: any = await getCategoriesAndTags();
    // Assuming API structure matches: { data: { categories: [...] } } or just { categories: [...] }
    // User said field 'categories'
    if (res && res.categories) {
      categories.value = res.categories.map((c: any) => ({
        id: c.id,
        name: c.name,
        href: `/categories/${c.id}`
      }));
    } else if (res && res.data && res.data.categories) {
        categories.value = res.data.categories.map((c: any) => ({
        id: c.id,
        name: c.name,
        href: `/categories/${c.id}`
      }));
    }
  } catch (error) {
    console.error('Failed to fetch categories', error);
  }
});

const syncSearchFromRoute = () => {
  const q = route.query.q;
  searchQuery.value = typeof q === 'string' ? q : '';
};

const pushSearchToRoute = (q: string) => {
  const nextQuery: Record<string, any> = { ...route.query };
  const trimmed = q.trim();
  if (trimmed) nextQuery.q = trimmed;
  else delete nextQuery.q;
  router.replace({ query: nextQuery });
};

watch(
  () => route.query.q,
  () => syncSearchFromRoute(),
  { immediate: true }
);

watch(
  searchQuery,
  (q) => pushSearchToRoute(q),
  { flush: 'post' }
);

const navItems = [
  { name: '首页', href: '/' },
  { name: '关于我', href: '/about' },
];
</script>

<template>
  <header class="fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-all duration-300 bg-[color-mix(in_oklab,var(--panel-strong)_78%,transparent)] border-b border-(--stroke)">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center h-16">
        <!-- Left: Logo -->
        <div class="flex-1 flex justify-start">
          <router-link to="/" class="shrink-0 group cursor-pointer">
            <span class="text-xl font-semibold tracking-[0.18em] uppercase transition-colors group-hover:text-(--accent)" style="font-family: var(--font-display)">
              ANTIGRAVITY
            </span>
          </router-link>
        </div>

        <!-- Center: Desktop Navigation -->
        <div class="hidden md:flex items-center justify-center space-x-6">
            <router-link
              v-for="item in navItems"
              :key="item.name"
              :to="item.href"
              class="px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 text-(--muted) hover:text-(--text) hover:bg-[color-mix(in_oklab,var(--panel)_75%,transparent)]"
              active-class="bg-[color-mix(in_oklab,var(--panel)_85%,transparent)] text-[var(--text)]"
            >
              {{ item.name }}
            </router-link>

            <!-- Category Dropdown -->
            <div class="relative group inline-block text-left">
              <button class="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 focus:outline-none text-(--muted) hover:text-(--text) hover:bg-[color-mix(in_oklab,var(--panel)_75%,transparent)]">
                <span>分类</span>
                <svg class="w-4 h-4 ml-1 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
              
              <!-- Dropdown Menu -->
              <div class="absolute right-0 mt-0 w-52 origin-top-right rounded-xl shadow-lg focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 z-50 border border-(--stroke) bg-[color-mix(in_oklab,var(--panel-strong)_90%,transparent)] backdrop-blur-md">
                <div class="py-1">
                  <router-link
                    v-for="category in categories"
                    :key="category.id"
                    :to="category.href"
                    class="block px-4 py-2 text-sm transition-colors text-(--muted) hover:text-(--text) hover:bg-[color-mix(in_oklab,var(--panel)_85%,transparent)]"
                  >
                    {{ category.name }}
                  </router-link>
                </div>
              </div>
            </div>
        </div>

        <!-- Right: Icons -->
        <div class="flex-1 flex justify-end items-center space-x-4">
           <!-- Mobile menu button -->
           <button
             type="button"
             class="md:hidden inline-flex items-center justify-center rounded-full w-10 h-10 border border-(--stroke) bg-[color-mix(in_oklab,var(--panel)_82%,transparent)] text-(--muted) hover:text-(--text) hover:bg-[color-mix(in_oklab,var(--panel)_92%,transparent)] transition-colors"
             @click="mobileOpen = !mobileOpen"
             :aria-expanded="mobileOpen"
             aria-label="Toggle navigation"
           >
             <svg v-if="!mobileOpen" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-5 h-5">
               <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
             </svg>
             <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-5 h-5">
               <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
             </svg>
           </button>

           <!-- Search with Expandable Input -->
           <div class="flex items-center relative">
             <div
               class="flex items-center justify-center rounded-full transition-all duration-300 overflow-hidden border border-(--stroke) bg-[color-mix(in_oklab,var(--panel)_82%,transparent)]"
               :class="searchOpen ? 'w-56' : 'w-10'"
             >
               <input 
                 v-model="searchQuery"
                 type="text" 
                 placeholder="Search..." 
                 class="bg-transparent border-none text-sm text-(--text) placeholder-(--muted-2) focus:outline-none transition-all duration-300"
                 :class="searchOpen ? 'w-full px-3 opacity-100' : 'w-0 px-0 opacity-0'"
                 @focus="searchOpen = true"
                 @keydown.esc="searchOpen = false"
               />
               <button
                 class="p-2 rounded-full transition-colors z-10 shrink-0 text-(--muted-2) hover:text-(--text)"
                 type="button"
                 @click="searchOpen = !searchOpen"
                 aria-label="Toggle search"
               >
                 <span class="sr-only">Search</span>
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
               </button>
             </div>
           </div>

           <!-- Theme Switcher -->
           <button 
             @click="toggleTheme" 
             class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-(--accent) focus:ring-offset-2 focus:ring-offset-(--app-bg) border border-(--stroke)"
             :class="isDark ? 'bg-[color-mix(in_oklab,var(--accent)_75%,transparent)]' : 'bg-[color-mix(in_oklab,var(--panel)_92%,transparent)]'"
           >
             <span class="sr-only">Toggle theme</span>
             <span 
              class="flex h-4 w-4 transform items-center justify-center rounded-full bg-white transition-transform duration-200 ease-in-out"
               :class="isDark ? 'translate-x-6' : 'translate-x-1'"
             >
               <!-- Optional: Sun/Moon icons inside the knob -->
               <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                 <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" clip-rule="evenodd" />
               </svg>
               <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
                 <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
               </svg>
             </span>
           </button>
        </div>
      </div>
    </div>

    <!-- Mobile panel -->
    <transition name="fade">
      <div v-show="mobileOpen" class="md:hidden border-t border-(--stroke) bg-[color-mix(in_oklab,var(--panel-strong)_92%,transparent)] backdrop-blur-md">
        <div class="max-w-7xl mx-auto px-4 py-4 space-y-2">
          <router-link
            v-for="item in navItems"
            :key="item.name"
            :to="item.href"
            class="flex items-center justify-between rounded-xl px-4 py-3 border border-(--stroke) bg-[color-mix(in_oklab,var(--panel)_78%,transparent)] text-(--text) transition-colors hover:bg-[color-mix(in_oklab,var(--panel)_92%,transparent)]"
            @click="mobileOpen = false"
          >
            <span class="text-sm font-semibold">{{ item.name }}</span>
            <span class="text-(--muted-2)">→</span>
          </router-link>

          <div class="pt-2">
            <div class="px-1 text-xs tracking-[0.22em] uppercase text-(--muted-2)">分类</div>
            <div class="mt-2 grid grid-cols-2 gap-2">
              <router-link
                v-for="category in categories"
                :key="category.id"
                :to="category.href"
                class="rounded-xl px-3 py-2 border border-(--stroke) bg-[color-mix(in_oklab,var(--panel)_78%,transparent)] text-sm text-(--text) hover:bg-[color-mix(in_oklab,var(--panel)_92%,transparent)] transition-colors"
                @click="mobileOpen = false"
              >
                {{ category.name }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>
