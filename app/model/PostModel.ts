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

export interface CategoryResponse {
  id: string;
  catName: string;
  postIDs: [];
  posts: [
    {
      id: string;
      title: string;
      content: string;
      imageUrl: string;
      publicId: string;
      catName: string;
      authorEmail: string;
      links: string[];
      createdAt: string;
      updatedAt: string;
      author: {
        id: string;
        name: string;
        email: string;
        emailVerified: string;
        image: string;
      };
    }
  ];
}

export interface AuthorResponse {
  id: string;
  name: string;
  email: string;
  emailVerified: null;
  image: string;
  posts: [
    {
      id: string;
      title: string;
      content: string;
      imageUrl: string;
      publicId: string;
      catName: string;
      authorEmail: string;
      links: string[];
      createdAt: string;
      updatedAt: string;
    }
  ];
}
