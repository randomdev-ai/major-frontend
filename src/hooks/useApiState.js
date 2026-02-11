import { useState } from 'react';

export const useApiState = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const wrap = async (fn) => {
    setLoading(true);
    setError('');
    try {
      return await fn();
    } catch (err) {
      if (err.response?.status === 400) {
        setError(err.response.data?.detail || 'Please check your form values.');
      } else if (err.response?.status >= 500) {
        setError('A system error occurred. Please try again shortly.');
      } else {
        setError('Unable to complete the request right now.');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, setError, wrap };
};
