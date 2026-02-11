const mergeHeaders = (base = {}, extra = {}) => ({ ...base, ...extra });

class InterceptorManager {
  constructor() {
    this.handlers = [];
  }

  use(onFulfilled, onRejected) {
    this.handlers.push({ onFulfilled, onRejected });
    return this.handlers.length - 1;
  }
}

const axios = {
  create(defaults = {}) {
    const instance = {
      defaults,
      interceptors: {
        request: new InterceptorManager(),
        response: new InterceptorManager(),
      },
    };

    const runRequestInterceptors = async (config) => {
      let current = config;
      for (const handler of instance.interceptors.request.handlers) {
        if (handler?.onFulfilled) current = await handler.onFulfilled(current);
      }
      return current;
    };

    const runResponseInterceptors = async (response, error) => {
      if (!error) {
        let current = response;
        for (const handler of instance.interceptors.response.handlers) {
          if (handler?.onFulfilled) current = await handler.onFulfilled(current);
        }
        return current;
      }

      let currentError = error;
      for (const handler of instance.interceptors.response.handlers) {
        if (handler?.onRejected) {
          try {
            return await handler.onRejected(currentError);
          } catch (nextError) {
            currentError = nextError;
          }
        }
      }
      throw currentError;
    };

    const request = async (method, url, data, config = {}) => {
      const initialConfig = {
        ...defaults,
        ...config,
        method,
        url: `${defaults.baseURL || ''}${url}`,
        headers: mergeHeaders(defaults.headers || {}, config.headers || {}),
        data,
      };
      const finalConfig = await runRequestInterceptors(initialConfig);

      try {
        const response = await fetch(finalConfig.url, {
          method: finalConfig.method,
          headers: mergeHeaders({ 'Content-Type': 'application/json' }, finalConfig.headers),
          body: data !== undefined ? JSON.stringify(data) : undefined,
        });

        const parsedData = await response.json().catch(() => ({}));
        const payload = {
          data: parsedData,
          status: response.status,
          headers: {},
          config: finalConfig,
        };

        if (!response.ok) {
          const requestError = new Error('Request failed');
          requestError.response = payload;
          throw requestError;
        }

        return runResponseInterceptors(payload);
      } catch (error) {
        return runResponseInterceptors(null, error);
      }
    };

    instance.get = (url, config) => request('GET', url, undefined, config);
    instance.post = (url, data, config) => request('POST', url, data, config);

    return instance;
  },
};

export default axios;
