'use client';

import React, { useState } from 'react';
import AuthForm from './AuthForm';

const Register: React.FC = () => {
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 登録処理をここに記述
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    console.log('登録試行:', { username, email, password });

    // エラーがある場合は setErrors を使用してエラーメッセージを更新
    setErrors(['そのメールアドレスは既に使用されています']);
  };

  const fields = [
    {
      type: 'text',
      placeholder: 'Username',
      name: 'username',
    },
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
      title="Sign up"
      linkText="Have an account?"
      linkHref="/login"
      errors={errors}
      fields={fields}
      submitButtonText="Sign up"
      onSubmit={handleSubmit}
    />
  );
};

export default Register;
