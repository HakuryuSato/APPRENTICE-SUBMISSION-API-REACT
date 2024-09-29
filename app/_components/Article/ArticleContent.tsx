import React from 'react';
import TagList from '@/app/_components/Home/TagList';

interface ArticleContentProps {
  article: {
    body: string;
    tagList: string[];
  };
}

const ArticleContent: React.FC<ArticleContentProps> = ({ article }) => {
  return (
    <div className="row article-content">
      <div className="col-md-12">
        <p>{article.body}</p>

        <TagList tags={article.tagList} />
      </div>
    </div>
  );
};

export default ArticleContent;
