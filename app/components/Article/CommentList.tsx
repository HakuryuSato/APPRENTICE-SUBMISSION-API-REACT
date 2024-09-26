import React from 'react';
import Comment from './Comment';

interface CommentListProps {
  comments: {
    id: number;
    body: string;
    createdAt: string;
    author: {
      username: string;
      image: string;
    };
  }[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </>
  );
};

export default CommentList;
