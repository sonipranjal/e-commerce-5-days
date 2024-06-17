import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import AuthContextProvider from "@/contexts/auth-context";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AuthContextProvider>
      <main className={GeistSans.className}>
        <Component {...pageProps} />
      </main>
    </AuthContextProvider>
  );
};

export default api.withTRPC(MyApp);
