import React from "react";
import ArticleMeta from "./ArticleMeta";
import type { Article } from "@custom-types/article";

interface ArticleBannerProps {
  article: Article;
}

const ArticleBanner: React.FC<ArticleBannerProps> = ({ article }) => {
  return (
    <div className="banner">
      <div className="container">
        <h1>{article.title}</h1>

        <ArticleMeta article={article} />
      </div>
    </div>
  );
};

export default ArticleBanner;
