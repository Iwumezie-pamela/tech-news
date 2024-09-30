export interface PostResponse {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  publicId?: string;
  catName?: string;
  links: null | string[];
  createdAt: string;
  updatedAt: string;
  authorEmail: string;
  author: {
    name: string;
  };
}


export interface CategoriesResponse {
  id: string;
  catName: string;
  postIDs: [];
}
