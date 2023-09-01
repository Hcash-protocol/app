import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { SideBarData } from "../constants/data/sidebar";
import styles from "../styles/Home.module.css";
const BaseLayout = ({
  children,
  selectTabIndex = 0,
}: {
  children: React.ReactNode;
  selectTabIndex?: number;
}) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setLoading(true);
    const handleComplete = (url: string) => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  if (typeof window === "undefined" || !isBrowser) {
    return <></>;
  }

  return (
    <div className={styles.App}>
      <Head>
        <title>Hcash Protocol</title>
        <link rel="shortcut icon" href={"/favicon.ico"} />
        <meta name="description" content="Hcash Protocol" />
        <meta property="og:url" content="https://hcash.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Hcash Protocol" />
        <meta property="og:description" content="Hcash Protocol" />
        <meta
          property="og:image"
          content={`https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?auto=format&fit=crop&w=1024`}
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="https://hcash.com" />
        <meta property="twitter:url" content="https://hcash.com" />
        <meta name="twitter:title" content="Hcash Protocol" />
        <meta name="twitter:description" content="Hcash Protocol" />
        <meta
          name="twitter:image"
          content={`https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?auto=format&fit=crop&w=1024`}
        />
      </Head>
      <Sidebar
        isLoading={isLoading}
        selectIndex={selectTabIndex}
        content={children}
        data={SideBarData}
      />
    </div>
  );
};

export default BaseLayout;
