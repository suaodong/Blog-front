<script setup lang="ts">
import { computed, ref, watch } from 'vue';
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
const query = computed(() => (typeof route.query.q === 'string' ? route.query.q.trim().toLowerCase() : ''));

const filteredArticles = computed(() => {
  const q = query.value;
  if (!q) return articles.value;
  return articles.value.filter((a) => {
    const hay = `${a.title ?? ''} ${a.description ?? ''}`.toLowerCase();
    return hay.includes(q);
  });
});

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
        <h1 class="text-4xl sm:text-5xl font-semibold mb-3 tracking-tight" style="font-family: var(--font-display)">
          {{ categoryName }}
        </h1>
        <div class="h-1 w-20 bg-[linear-gradient(90deg,var(--accent),var(--accent-2))] mx-auto rounded-full"></div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-(--accent)"></div>
      </div>

      <!-- Article Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article 
          v-for="article in filteredArticles" 
          :key="article.id"
          class="group relative rounded-3xl overflow-hidden transition-all duration-500 border border-(--stroke) bg-[color-mix(in_oklab,var(--panel-strong)_82%,transparent)] shadow-(--shadow) hover:translate-y-[-3px]"
          @click="goToArticle(article.id)"
        >
          <!-- Image Container -->
          <div class="relative h-48 overflow-hidden">
            <img 
              :src="getImageUrl(article.cover)" 
              :alt="article.title"
              class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.55))] opacity-80 group-hover:opacity-55 transition-opacity duration-300"></div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <div class="flex items-center text-xs text-(--muted-2) mb-3 space-x-2">
              <span>{{ formatDate(article.create_time) }}</span>
              <span class="w-1 h-1 bg-[color-mix(in_oklab,var(--muted-2)_70%,transparent)] rounded-full"></span>
              <span class="text-(--accent)">Read more</span>
            </div>
            
            <h2 class="text-xl font-semibold mb-3 transition-colors line-clamp-2 group-hover:text-(--accent)" style="font-family: var(--font-display)">
              {{ article.title }}
            </h2>
            
            <p class="text-(--muted) text-sm leading-relaxed line-clamp-3 mb-4">
              {{ article.description }}
            </p>
          </div>
        </article>
      </div>
      
      <!-- Empty State -->
      <div v-if="!loading && filteredArticles.length === 0" class="text-center text-(--muted) mt-20">
        <p v-if="query">未找到与 “{{ route.query.q }}” 相关的文章。</p>
        <p v-else>此类别中未找到相关文章.</p>
      </div>

      <!-- Pagination -->
      <div v-if="!loading && total > pageSize" class="flex justify-center mt-12 space-x-2">
        <button 
          @click="handlePageChange(currentPage - 1)" 
          :disabled="currentPage === 1"
          class="px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-(--stroke) bg-[color-mix(in_oklab,var(--panel-strong)_82%,transparent)] hover:bg-[color-mix(in_oklab,var(--panel-strong)_92%,transparent)]"
        >
          Previous
        </button>
        
        <div class="flex space-x-1">
             <button 
                v-for="page in Math.ceil(total / pageSize)" 
                :key="page"
                @click="handlePageChange(page)"
                :class="[
                  'w-10 h-10 rounded-md border border-(--stroke) transition-colors',
                  currentPage === page ? 'bg-(--accent) text-white' : 'bg-[color-mix(in_oklab,var(--panel-strong)_82%,transparent)] text-(--muted) hover:bg-(--accent) hover:text-white'
                ]"
             >
                {{ page }}
             </button>
        </div>

        <button 
          @click="handlePageChange(currentPage + 1)" 
          :disabled="currentPage >= Math.ceil(total / pageSize)"
          class="px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-(--stroke) bg-[color-mix(in_oklab,var(--panel-strong)_82%,transparent)] hover:bg-[color-mix(in_oklab,var(--panel-strong)_92%,transparent)]"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
