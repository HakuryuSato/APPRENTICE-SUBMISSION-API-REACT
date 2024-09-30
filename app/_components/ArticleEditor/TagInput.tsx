import React from 'react';

interface TagInputProps {
  tagList: string[];
  removeTag: (tag: string) => void;
}

const TagInput: React.FC<TagInputProps> = ({ tagList, removeTag }) => {
  return (
    <div className="tag-list">
      {tagList.map((tag) => (
        <span className="tag-default tag-pill" key={tag}>
          <i
            className="ion-close-round"
            onClick={() => removeTag(tag)}
            style={{ cursor: 'pointer' }}
          ></i>{' '}
          {tag}
        </span>
      ))}
    </div>
  );
};

export default TagInput;