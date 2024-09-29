"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ArticlePage from "@/app/_components/Article/ArticlePage";
import { getArticle } from "@utils/api";
import type { Article } from "@/app/_custom-types/article";

const ArticlePageWrapper: React.FC = () => {
  const params = useParams();
  const slugParam = params?.slug;

  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!slugParam || Array.isArray(slugParam)) {
      setError("Invalid slug");
      setLoading(false);
      return;
    }

    const fetchArticle = async () => {
      try {
        const data = await getArticle(slugParam);
        setArticle(data.article);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slugParam]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!article) {
    return <div>No article found.</div>;
  }

  return <ArticlePage article={article} />;
};

export default ArticlePageWrapper;
