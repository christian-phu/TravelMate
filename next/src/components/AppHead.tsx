import Head from "next/head";

const AppHead = ({ title }: { title?: string }) => {
  return (
    <Head>
      <title>{title ?? "Travel Mate AI"}</title>
      <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      <link rel="mask-icon" href="/favicon.svg" />
    </Head>
  );
};

export default AppHead;
