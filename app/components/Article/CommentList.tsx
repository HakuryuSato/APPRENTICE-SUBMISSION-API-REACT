import React from "react";
import Comment from "./Comment";
import type { ArticleComment } from "@custom-types/article_comment";

interface CommentListProps {
  comments: ArticleComment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
        />
      ))}
    </>
  );
};

export default CommentList;
