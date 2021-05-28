import { useCallback, useState } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const sendRequest = useCallback((requestConfig, applyData) => {
    setIsLoading(true);
    setIsError(false);
    fetch(requestConfig.url, {
      method: requestConfig.method ? requestConfig.method : 'GET',
      body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      headers: {
        'Content-Type': 'application/json',
      },
      // headers: requestConfig.headers ? requestConfig.headers : {},
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Request failed!');
        }
      })
      .then((resData) => {
        applyData(resData);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  return { isLoading, isError, setIsError, sendRequest };
};

export default useHttp;
