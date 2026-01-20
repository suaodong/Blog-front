<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
import 'md-editor-v3/lib/style.css';
import { getArticleById } from '../api/article';
import { baseURL } from '../utils/request';
import { useArticleStore } from '../stores/article';
import type { Article } from '../types';
import paperPlaneIcon from '../assets/paper-plane.png';

const MdPreview = defineAsyncComponent(() => import('md-editor-v3').then((mod) => mod.MdPreview));

const route = useRoute();
const articleStore = useArticleStore();
const article = ref<Article | null>(null);
const loading = ref(true);
const showBackToTop = ref(false);

const getImageUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${baseURL}${url}`;
};

const fetchArticle = async (id: number) => {
  loading.value = true;
  
  // Try to get from store first
  const cachedArticle = articleStore.getArticleById(id);
  if (cachedArticle) {
    article.value = cachedArticle;
    loading.value = false;
    return;
  }

  // Fallback to API if not in store (e.g. direct access)
  try {
    const res: any = await getArticleById(id);
    // Handle different response structures
    if (res.data) {
        article.value = res.data;
    } else {
        article.value = res;
    }
  } catch (error) {
    console.error('Failed to fetch article:', error);
  } finally {
    loading.value = false;
  }
};

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  if (route.params.id) {
    fetchArticle(Number(route.params.id));
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      fetchArticle(Number(newId));
    }
  }
);

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
</script>

<template>
  <div v-if="loading && !article" class="flex justify-center items-center min-h-screen pt-16">
    <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
  </div>
  <div v-else-if="article" class="relative min-h-screen pt-16">
    <!-- Hero Section with Parallax Effect -->
    <div class="relative h-[60vh] w-full overflow-hidden">
      <div 
        class="absolute inset-0 bg-cover bg-center transform scale-105"
        :style="{ backgroundImage: `url(${getImageUrl(article.cover)})` }"
      >
        <div class="absolute inset-0 bg-gradient-to-b from-brand-dark/30 via-brand-dark/60 to-brand-dark"></div>
      </div>
      
      <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
        <span class="px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-brand-primary uppercase border border-brand-primary/30 rounded-full bg-brand-primary/10 backdrop-blur-sm">
          技术杂烩
        </span>
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-4 max-w-4xl leading-tight">
          {{ article.title }}
        </h1>
        <div class="flex items-center space-x-4 text-gray-400 text-sm">
          <span>{{ formatDate(article.create_time) }}</span>
          <span>•</span>
          <span>{{ article.description }}</span>
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <article class="relative z-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
      <div class="bg-[#1a1a1a]/80 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl border border-white/5 ring-1 ring-white/10">
        <MdPreview 
          editorId="preview-only" 
          :modelValue="article.content" 
          theme="dark" 
          class="!bg-transparent"
        />
        
        <!-- Footer Meta -->
        <div class="mt-12 pt-8 border-t border-white/10 flex justify-between items-center text-gray-500 text-sm">
           <div>
             Last updated: {{ formatDate(article.update_time) }}
           </div>
           <div class="flex space-x-2">
             <!-- Share buttons placeholders -->
             <button class="hover:text-white transition-colors">Share</button>
           </div>
        </div>
      </div>
    </article>
    
    <!-- Spacer -->
    <div class="h-20"></div>

    <!-- Back to Top Button -->
    <transition name="fade">
      <button
        v-show="showBackToTop"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 bg-transparent z-50 transform hover:scale-110 transition-all duration-300 focus:outline-none"
        aria-label="Back to top"
      >
        <img :src="paperPlaneIcon" alt="Back to top" class="w-12 h-12 drop-shadow-lg" />
      </button>
    </transition>
  </div>
</template>

<style scoped>
/* Override MdPreview background to be transparent */
:deep(.md-editor) {
  background-color: transparent !important;
}
:deep(.md-editor-preview-wrapper) {
  padding: 0;
}
</style>
