import type { NextApiRequest, NextApiResponse } from 'next';

let articles: { slug: string; title: string; body: string; author: string }[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  switch (req.method) {
    case 'GET':
      const article = articles.find((a) => a.slug === slug);
      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }
      res.status(200).json({ article });
      break;

    case 'PUT':
      const { title, body } = req.body;
      const articleToUpdate = articles.find((a) => a.slug === slug);
      if (!articleToUpdate) {
        return res.status(404).json({ message: 'Article not found' });
      }
      articleToUpdate.title = title;
      articleToUpdate.body = body;
      res.status(200).json({ article: articleToUpdate });
      break;

    case 'DELETE':
      articles = articles.filter((a) => a.slug !== slug);
      res.status(200).json({ message: 'Article deleted' });
      break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}
