import React from 'react';

interface TagListProps {
  tags: string[];
}

const TagList: React.FC<TagListProps> = ({ tags }) => (
  <div className="tag-list">
    {tags.map((tag) => (
      <span className="tag-pill tag-default" key={tag}>
        {tag}
      </span>
    ))}
  </div>
);

export default TagList;
