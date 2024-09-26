import React, { useState } from 'react';
import TagInput from './TagInput';

interface ArticleFormProps {
  onSubmit: (articleData: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  }) => void;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tagList, setTagList] = useState<string[]>([]);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      setTagList([...tagList, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
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
            rows={8}
            placeholder="Write your article (in markdown)"
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
            onKeyDown={handleAddTag}
          />
          <TagInput tagList={tagList} removeTag={handleRemoveTag} />
        </fieldset>
        <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
          Publish Article
        </button>
      </fieldset>
    </form>
  );
};

export default ArticleForm;