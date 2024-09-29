'use client';

import React, { useState } from 'react';
import AuthForm from './AuthForm';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/_contexts/AuthContext';
import { ErrorResponse } from '@/app/_custom-types/error_response';

const Login: React.FC = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await login(email, password);
      // ログイン成功後、トップページにリダイレクト
      router.push('/');
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'errors' in error) {
        const err = error as ErrorResponse;
        setErrors([err.errors.message || 'Login failed']);
      } else {
        setErrors(['Login failed']);
      }
    }
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
