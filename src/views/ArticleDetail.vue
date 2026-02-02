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
const mdTheme = ref<'dark' | 'light'>('dark');
let themeObserver: MutationObserver | null = null;

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
  const syncTheme = () => {
    mdTheme.value = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  };
  syncTheme();
  themeObserver = new MutationObserver(syncTheme);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  window.addEventListener('scroll', handleScroll);
  if (route.params.id) {
    fetchArticle(Number(route.params.id));
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  themeObserver?.disconnect();
  themeObserver = null;
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
    <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-(--accent)"></div>
  </div>
  <div v-else-if="article" class="relative min-h-screen pt-16">
    <!-- Hero Section with Parallax Effect -->
    <div class="relative h-[60vh] w-full overflow-hidden">
      <div 
        class="absolute inset-0 bg-cover bg-center transform scale-105"
        :style="{ backgroundImage: `url(${getImageUrl(article.cover)})` }"
      >
        <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.65))]"></div>
      </div>
      
      <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
        <span class="px-3 py-1 mb-4 text-xs font-semibold tracking-[0.22em] uppercase border border-white/20 rounded-full bg-black/20 backdrop-blur-sm text-white">
          技术杂烩
        </span>
        <h1 class="text-4xl md:text-6xl font-semibold text-white mb-4 max-w-4xl leading-tight" style="font-family: var(--font-display)">
          {{ article.title }}
        </h1>
        <div class="flex items-center justify-center flex-wrap gap-x-4 gap-y-2 text-white/75 text-sm">
          <span>{{ formatDate(article.create_time) }}</span>
          <span>•</span>
          <span>{{ article.description }}</span>
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <article class="relative z-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
      <div class="rounded-3xl p-7 md:p-11 shadow-(--shadow) border border-(--stroke) bg-[color-mix(in_oklab,var(--panel-strong)_86%,transparent)] backdrop-blur-md">
        <MdPreview 
          editorId="preview-only" 
          :modelValue="article.content" 
          :theme="mdTheme"
          class="bg-transparent!"
        />
        
        <!-- Footer Meta -->
        <div class="mt-12 pt-8 border-t border-(--stroke) flex justify-between items-center text-(--muted-2) text-sm">
           <div>
             Last updated: {{ formatDate(article.update_time) }}
           </div>
           <div class="flex space-x-2">
             <!-- Share buttons placeholders -->
             <button class="hover:text-(--text) transition-colors">Share</button>
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
