import React from 'react';

interface ErrorMessagesProps {
  errors: string[];
}

const ErrorMessages: React.FC<ErrorMessagesProps> = ({ errors }) => {
  if (errors.length === 0) return null;

  return (
    <ul className="error-messages">
      {errors.map((error, index) => (
        <li key={index}>{error}</li>
      ))}
    </ul>
  );
};

export default ErrorMessages;