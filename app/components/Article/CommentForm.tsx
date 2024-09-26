'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const CommentForm: React.FC = () => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // コメント投稿処理をここに記述予定
    console.log('コメント投稿:', comment);
    setComment('');
  };

  const currentUser = {
    image: 'http://i.imgur.com/Qr71crq.jpg',
  };

  return (
    <form className="card comment-form" onSubmit={handleSubmit}>
      <div className="card-block">
        <textarea
          className="form-control"
          placeholder="Write a comment..."
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      <div className="card-footer">
        <Image
          src={currentUser.image}
          alt="User image"
          className="comment-author-img"
          width={32}
          height={32}
        />
        <button className="btn btn-sm btn-primary" type="submit">
          Post Comment
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
