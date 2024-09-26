'use client';

import React, { useState } from 'react';
import AuthForm from './AuthForm';

const Login: React.FC = () => {
  const [errors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ログイン処理をここに記述します
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    console.log('ログイン試行:', { email, password });

    // エラーがある場合は setErrors を使用してエラーメッセージを更新します
    // setErrors(['無効なメールアドレスまたはパスワードです']);
  };

  const fields = [
    {
      type: 'text',
      placeholder: 'Email',
      name: 'email',
    },
    {
      type: 'password',
      placeholder: 'Password',
      name: 'password',
    },
  ];

  return (
    <AuthForm
      title="Sign in"
      linkText="Need an account?"
      linkHref="/register"
      errors={errors}
      fields={fields}
      submitButtonText="Sign in"
      onSubmit={handleSubmit}
    />
  );
};

export default Login;
