<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getCategoriesAndTags } from '../api/article';
import type { Category } from '../types';

const categories = ref<Category[]>([]);
const isDark = ref(true);
const searchQuery = ref('');

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

const navItems = [
  { name: '首页', href: '/' },
  { name: '关于我', href: '#' },
];
</script>

<template>
  <header class="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[#C7EDCC]/90 dark:bg-black/20 border-b border-[#B3E1BD] dark:border-white/10 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center h-16">
        <!-- Left: Logo -->
        <div class="flex-1 flex justify-start">
          <router-link to="/" class="flex-shrink-0 group cursor-pointer">
            <span class="text-gray-900 dark:text-white text-xl font-bold tracking-wider group-hover:text-brand-primary transition-colors">ANTIGRAVITY</span>
          </router-link>
        </div>

        <!-- Center: Desktop Navigation -->
        <div class="hidden md:flex items-center justify-center space-x-6">
            <router-link
              v-for="item in navItems"
              :key="item.name"
              :to="item.href"
              class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-[#B3E1BD] dark:hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
              active-class="bg-[#B3E1BD] dark:bg-white/10 text-gray-900 dark:text-white"
            >
              {{ item.name }}
            </router-link>

            <!-- Category Dropdown -->
            <div class="relative group inline-block text-left">
              <button class="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-[#B3E1BD] dark:hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 focus:outline-none">
                <span>分类</span>
                <svg class="w-4 h-4 ml-1 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
              
              <!-- Dropdown Menu -->
              <div class="absolute right-0 mt-0 w-48 origin-top-right rounded-md bg-[#C7EDCC] dark:bg-[#1a1a1a] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 z-50 border border-[#B3E1BD] dark:border-white/10">
                <div class="py-1">
                  <router-link
                    v-for="category in categories"
                    :key="category.id"
                    :to="category.href"
                    class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-[#B3E1BD] dark:hover:bg-brand-primary hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {{ category.name }}
                  </router-link>
                </div>
              </div>
            </div>
        </div>

        <!-- Right: Icons -->
        <div class="flex-1 flex justify-end items-center space-x-4">
           <!-- Search with Expandable Input -->
           <div class="flex items-center group relative">
             <div class="flex items-center justify-center bg-[#B3E1BD] dark:bg-white/10 rounded-full transition-all duration-300 w-10 group-hover:w-48 overflow-hidden">
               <input 
                 v-model="searchQuery"
                 type="text" 
                 placeholder="Search..." 
                 class="w-0 group-hover:w-full bg-transparent border-none text-sm text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none px-0 group-hover:px-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
               />
               <button class="p-2 rounded-full text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors z-10 flex-shrink-0">
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
             class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-[#C7EDCC] dark:focus:ring-offset-gray-900"
             :class="isDark ? 'bg-brand-primary' : 'bg-[#B3E1BD]'"
           >
             <span class="sr-only">Toggle theme</span>
             <span 
               class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out flex items-center justify-center"
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
  </header>
</template>
