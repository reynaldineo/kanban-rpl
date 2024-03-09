import "@/styles/globals.css";

import api from "@/libs/api";
import {
  QueryClient,
  QueryClientProvider,
  QueryOptions,
} from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Toaster } from "sonner";
import SEO from "../seo.config";
import { DefaultSeo } from "next-seo";

// * ===== React Query =====
const defaultQueryFn = async ({ queryKey }: QueryOptions) => {
  return await api.get(`${queryKey?.[0]}`);
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
      <Toaster richColors closeButton position="top-center" />
    </QueryClientProvider>
  );
}
