import { useState, useCallback } from 'react';

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const call = useCallback(
    async (apiFunction: () => Promise<any>, options?: UseApiOptions) => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiFunction();

        if (response.success) {
          options?.onSuccess?.(response.data);
          return response;
        } else {
          const errorMsg = response.error || 'حدث خطأ غير متوقع';
          setError(errorMsg);
          options?.onError?.(errorMsg);
          return response;
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'خطأ في الاتصال';
        setError(errorMsg);
        options?.onError?.(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { call, loading, error };
}
