// app/components/Article/CommentForm.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/app/_contexts/AuthContext';
const CommentForm: React.FC = () => {
  const { user } = useAuth();
  const [comment, setComment] = useState('');

  // ユーザーがログインしていない場合、フォームを表示しない
  if (!user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // コメント投稿処理をここに記述予定
    console.log('コメント投稿:', comment);
    setComment('');

    // 実際の実装では、コメントをAPIに送信し、状態を更新します
    // 例:
    /*
    try {
      await postComment(articleSlug, comment);
      // コメントリストを再取得または更新
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(`コメントの投稿に失敗しました: ${error.message}`);
      } else {
        alert('コメントの投稿に失敗しました。');
      }
    }
    */
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
          required
        ></textarea>
      </div>
      <div className="card-footer">
        <Image
          src={user.image || 'https://api.realworld.io/images/demo-avatar.png'}
          alt={`${user.username} image`}
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
