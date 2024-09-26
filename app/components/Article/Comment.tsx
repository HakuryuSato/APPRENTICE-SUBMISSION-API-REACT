import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface CommentProps {
  comment: {
    id: number;
    body: string;
    createdAt: string;
    author: {
      username: string;
      image: string;
    };
  };
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const { body, createdAt, author } = comment;

  const isAuthor = true; // 仮の値。実際には現在のユーザーと比較

  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{body}</p>
      </div>
      <div className="card-footer">
        <Link href={`/profile/${author.username}`} className="comment-author">
          <Image
            src={author.image}
            alt={author.username}
            className="comment-author-img"
            width={32}
            height={32}
          />
        </Link>
        &nbsp;
        <Link href={`/profile/${author.username}`} className="comment-author">
          {author.username}
        </Link>
        <span className="date-posted">{new Date(createdAt).toDateString()}</span>
        {isAuthor && (
          <span className="mod-options">
            <i className="ion-trash-a"></i>
          </span>
        )}
      </div>
    </div>
  );
};

export default Comment;
