'use client';

import React, { useState, useEffect } from 'react';

interface ArticleFormProps {
  onSubmit: (articleData: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  }) => void;
  initialData?: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  } | null;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [body, setBody] = useState(initialData?.body || '');
  const [tagInput, setTagInput] = useState('');
  const [tagList, setTagList] = useState<string[]>(initialData?.tagList || []);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setBody(initialData.body);
      setTagList(initialData.tagList || []);
    }
  }, [initialData]);

  const handleTagAdd = () => {
    if (tagInput && !tagList.includes(tagInput)) {
      setTagList([...tagList, tagInput]);
      setTagInput('');
    }
  };

  const handleTagRemove = (tag: string) => {
    setTagList(tagList.filter((t) => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, body, tagList });
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <fieldset className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Article Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </fieldset>
        <fieldset className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="What's this article about?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </fieldset>
        <fieldset className="form-group">
          <textarea
            className="form-control"
            placeholder="Write your article (in markdown)"
            rows={8}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </fieldset>
        <fieldset className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleTagAdd();
              }
            }}
          />
          <div className="tag-list">
            {tagList.map((tag) => (
              <span className="tag-default tag-pill" key={tag}>
                <i
                  className="ion-close-round"
                  onClick={() => handleTagRemove(tag)}
                ></i>
                {tag}
              </span>
            ))}
          </div>
        </fieldset>
        <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
          Publish Article
        </button>
      </fieldset>
    </form>
  );
};

export default ArticleForm;
