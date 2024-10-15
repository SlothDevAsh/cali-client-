import { SWRConfiguration } from "swr";

const config: SWRConfiguration = {
  onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
    if (error.status === 404) return;
    setTimeout(() => revalidate({ retryCount }), 5000);
  },
  provider: () => new Map(),
};

export default config;
