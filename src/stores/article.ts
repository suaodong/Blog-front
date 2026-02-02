import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Article } from '../types';

export const useArticleStore = defineStore('article', () => {
  const articles = ref<Article[]>([]);

  const setArticles = (newArticles: Article[]) => {
    articles.value = newArticles;
  };

  const getArticleById = (id: number) => {
    return articles.value.find(article => article.id === id);
  };

  return {
    articles,
    setArticles,
    getArticleById
  };
});
