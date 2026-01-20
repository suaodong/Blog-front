<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getArticles, getCategoriesAndTags } from '../api/article';
import { baseURL } from '../utils/request';
import { useArticleStore } from '../stores/article';
import type { Article } from '../types';

const route = useRoute();
const router = useRouter();
const articleStore = useArticleStore();
const articles = ref<Article[]>([]);
const loading = ref(false);
const categoryName = ref('');
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const categoryId = ref<number | null>(null);

const getImageUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${baseURL}${url}`;
};

const fetchCategoryName = async (id: number) => {
    try {
        const res: any = await getCategoriesAndTags();
        const cats = res.categories || (res.data && res.data.categories) || [];
        const found = cats.find((c: any) => c.id === id);
        if (found) {
            categoryName.value = found.name;
        } else {
             // Fallback if not found or API error, maybe use a map or keep empty
             categoryName.value = 'Category';
        }
    } catch (e) {
        console.error(e);
        categoryName.value = 'Category';
    }
}

const fetchArticles = async (id: number, page: number = 1) => {
  loading.value = true;
  try {
    const res: any = await getArticles({ 
        categoryId: id,
        page,
        pageSize: pageSize.value
    });
    
    // According to user: interface returns list field.
    // Assuming structure: { list: [...], total: ... } or { data: { list: [...], total: ... } }
    let listData = [];
    if (res && res.list) {
        listData = res.list;
        total.value = res.total || 0;
    } else if (res && res.data && res.data.list) {
        listData = res.data.list;
        total.value = res.data.total || 0;
    } else {
        // Fallback for previous structure
        if (Array.isArray(res)) listData = res;
    }
    
    articles.value = listData;
    articleStore.setArticles(listData);
    currentPage.value = page;

  } catch (error) {
    console.error(error);
    articles.value = [];
  } finally {
    loading.value = false;
  }
};

const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(total.value / pageSize.value) && categoryId.value) {
        fetchArticles(categoryId.value, newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const goToArticle = (id: number) => {
  router.push(`/articles/${id}`);
};

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      const id = Number(newId);
      categoryId.value = id;
      currentPage.value = 1; // Reset to page 1 on category change
      fetchCategoryName(id);
      fetchArticles(id, 1);
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Category Header -->
      <div class="mb-12 text-center animate-fade-in-up">
        <h1 class="text-4xl font-bold text-white mb-4">{{ categoryName }}</h1>
        <div class="h-1 w-20 bg-brand-primary mx-auto rounded-full"></div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>

      <!-- Article Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article 
          v-for="article in articles" 
          :key="article.id"
          class="group relative bg-[#F0F9EB] dark:bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#C7EDCC] dark:border-white/10"
          @click="goToArticle(article.id)"
        >
          <!-- Image Container -->
          <div class="relative h-48 overflow-hidden">
            <img 
              :src="getImageUrl(article.cover)" 
              :alt="article.title"
              class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300"></div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <div class="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3 space-x-2">
              <span>{{ formatDate(article.create_time) }}</span>
              <span class="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full"></span>
              <span class="text-brand-primary">Read more</span>
            </div>
            
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-brand-primary transition-colors line-clamp-2">
              {{ article.title }}
            </h2>
            
            <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
              {{ article.description }}
            </p>
          </div>
        </article>
      </div>
      
      <!-- Empty State -->
      <div v-if="!loading && articles.length === 0" class="text-center text-gray-500 dark:text-gray-400 mt-20">
        <p>此类别中未找到相关文章.</p>
      </div>

      <!-- Pagination -->
      <div v-if="!loading && total > pageSize" class="flex justify-center mt-12 space-x-2">
        <button 
          @click="handlePageChange(currentPage - 1)" 
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-[#F0F9EB] dark:bg-[#1a1a1a] text-gray-700 dark:text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary transition-colors border border-[#C7EDCC] dark:border-white/10"
        >
          Previous
        </button>
        
        <div class="flex space-x-1">
             <button 
                v-for="page in Math.ceil(total / pageSize)" 
                :key="page"
                @click="handlePageChange(page)"
                :class="[
                  'w-10 h-10 rounded-md border border-[#C7EDCC] dark:border-white/10 transition-colors',
                  currentPage === page ? 'bg-brand-primary text-white' : 'bg-[#F0F9EB] dark:bg-[#1a1a1a] text-gray-500 dark:text-gray-400 hover:bg-brand-primary hover:text-white'
                ]"
             >
                {{ page }}
             </button>
        </div>

        <button 
          @click="handlePageChange(currentPage + 1)" 
          :disabled="currentPage >= Math.ceil(total / pageSize)"
          class="px-4 py-2 bg-[#F0F9EB] dark:bg-[#1a1a1a] text-gray-700 dark:text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary transition-colors border border-[#C7EDCC] dark:border-white/10"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
