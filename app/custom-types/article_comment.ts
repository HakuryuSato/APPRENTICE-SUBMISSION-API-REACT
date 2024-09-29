export interface ArticleComment {
    id: number;
    body: string;
    createdAt: string;
    author: {
      username: string;
      image: string;
    };
  }