'use client'

import { useEffect, useState } from 'react';

type FetchOptions = RequestInit | undefined;

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | undefined;
  refresh: () => void;
}

const useFetch = <T>(url: string, options?: FetchOptions): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>();
  const [trigger ,setTrigger] = useState(0)

  const refresh = () => setTrigger(prev => +prev)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url, options || {}); // Default options to an empty object if none provided
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: T = await response.json();
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url, options, trigger]);
  
  return { data, isLoading, error, refresh };
};

export default useFetch;
