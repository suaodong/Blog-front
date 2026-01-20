export interface Article {
  id: number;
  title: string;
  description: string;
  content: string;
  categoryId: number;
  labelIds: string;
  cover: string;
  create_time: string;
  update_time: string;
}

export interface Category {
  id: number;
  name: string;
  href: string;
}
