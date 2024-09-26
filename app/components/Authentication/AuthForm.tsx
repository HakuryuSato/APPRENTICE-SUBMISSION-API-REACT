'use client';

import React from 'react';

interface Field {
  type: string;
  placeholder: string;
  name: string;
}

interface AuthFormProps {
  title: string;
  linkText: string;
  linkHref: string;
  errors: string[];
  fields: Field[];
  submitButtonText: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  linkText,
  linkHref,
  errors,
  fields,
  submitButtonText,
  onSubmit,
}) => (
  <div className="auth-page">
    <div className="container page">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center">{title}</h1>
          <p className="text-xs-center">
            <a href={linkHref}>{linkText}</a>
          </p>

          {errors.length > 0 && (
            <ul className="error-messages">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}

          <form onSubmit={onSubmit}>
            {fields.map((field, index) => (
              <fieldset className="form-group" key={index}>
                <input
                  className="form-control form-control-lg"
                  type={field.type}
                  placeholder={field.placeholder}
                  name={field.name}
                />
              </fieldset>
            ))}
            <button className="btn btn-lg btn-primary pull-xs-right">
              {submitButtonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

export default AuthForm;
