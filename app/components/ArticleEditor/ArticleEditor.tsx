'use client';

import React, { useState } from 'react';
import ErrorMessages from './ErrorMessages';
import ArticleForm from './ArticleForm';

const ArticleEditor: React.FC = () => {
  const [errors] = useState<string[]>([]);

  const handleSubmit = (articleData: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  }) => {

    // 記事の保存処理をここに記述予定
    console.log('記事データ:', articleData);
  };

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <ErrorMessages errors={errors} />
            <ArticleForm onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleEditor;
