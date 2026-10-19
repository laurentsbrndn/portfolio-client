import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import type { PortfolioData } from '../types/portfolio';
import { getPortfolioData } from '../api/portfolioAPI';

type Status = 'loading' | 'success' | 'error';

export const usePortfolioData = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [status, setStatus] = useState<Status>('loading');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    getPortfolioData(controller.signal)
      .then((result) => {
        setData(result);
        setStatus('success');
      })
      .catch((error: unknown) => {
        if (axios.isCancel(error)) return; // aborted by cleanup (StrictMode / unmount)
        console.error('Failed to load portfolio:', error);
        setStatus('error');
      });

    return () => controller.abort();
  }, [attempt]);

  const retry = useCallback(() => {
    setStatus('loading');
    setAttempt((value) => value + 1);
  }, []);

  return { data, status, retry };
};