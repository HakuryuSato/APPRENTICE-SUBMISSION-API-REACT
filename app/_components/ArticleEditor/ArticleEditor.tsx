'use client';

import React, { useState, useEffect } from 'react';
import ArticleForm from './ArticleForm';
import { useRouter, useParams } from 'next/navigation';
import { createArticle, getArticle, updateArticle } from '@utils/api';
import { ErrorResponse } from '@/app/_custom-types/api_types';

interface ArticleData {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

const ArticleEditor: React.FC = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [initialData, setInitialData] = useState<ArticleData | null>(null);
  const router = useRouter();
  const params = useParams();
  const slugParam = params?.slug;

  let slug: string | undefined;
  if (slugParam) {
    if (Array.isArray(slugParam)) {
      slug = slugParam[0];
    } else {
      slug = slugParam;
    }
  }

  useEffect(() => {
    if (slug) {
      // 編集モードの場合、記事データを取得
      getArticle(slug)
        .then((data) => {
          const { article } = data;
          setInitialData({
            title: article.title,
            description: article.description,
            body: article.body,
            tagList: article.tagList || [],
          });
        })
        .catch((error) => {
          console.error('Failed to fetch article data', error);
          setErrors(['Failed to load article data']);
        });
    }
  }, [slug]);

  const handleSubmit = async (articleData: ArticleData) => {
    try {
      if (slug) {
        // 記事の更新
        await updateArticle(slug, articleData);
        router.push(`/article/${slug}`);
      } else {
        // 記事の新規作成
        const { article } = await createArticle(articleData);
        router.push(`/article/${article.slug}`);
      }
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'errors' in error) {
        const err = error as ErrorResponse;
        setErrors([err.errors.message || 'Failed to save article']);
      } else {
        setErrors(['Failed to save article']);
      }
    }
  };

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            {errors.length > 0 && (
              <ul className="error-messages">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
            {(!slug || initialData) && (
              <ArticleForm onSubmit={handleSubmit} initialData={initialData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleEditor;
