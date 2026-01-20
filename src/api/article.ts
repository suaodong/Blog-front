import request from '../utils/request';

export const getArticles = async (params: { categoryId: number; page?: number; pageSize?: number }) => {
  return request({
    url: '/article/list',
    method: 'get',
    params
  });
};

export const getArticleById = async (id: number) => {
  return request({
    url: `/article/${id}`,
    method: 'get'
  });
};

export const getCategoriesAndTags = async () => {
  return request({
    url: '/article/categoryAndTag',
    method: 'get'
  });
};
